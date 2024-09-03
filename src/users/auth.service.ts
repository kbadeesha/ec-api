import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { CreateUserDto } from './dtos/create-user-dto';
import { SignInUserDto } from './dtos/signIn-user-dto';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(createUserDto: CreateUserDto) {
    const users = await this.userService.find(createUserDto.email);

    if (users.length) {
      throw new BadRequestException('email in use');
    }
    //create a function to encrypt password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(createUserDto.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    createUserDto.password = result;
    const user = await this.userService.create({
      ...createUserDto,
      password: result,
    });
    return user;
  }

  async signIn(signInUserDto: SignInUserDto) {
    const [user] = await this.userService.find(signInUserDto.email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(signInUserDto.password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }
    return user;
  }
}
