import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user-dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  //TODO: cannot create user with the same email
  create(CreateUserDto: CreateUserDto) {
    const user = this.repo.create(CreateUserDto);
    return this.repo.save(user);
  }

  findById(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } }); //
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);

    if (attrs.password) {
      //create a function to encrypt password
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(attrs.password, salt, 32)) as Buffer;
      const result = salt + '.' + hash.toString('hex');
      attrs.password = result;
      user.password = result;
    }

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
