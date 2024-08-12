import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityService } from 'src/core/entity';
import { UserRepository } from '../repositories';
import { SocketService } from 'src/modules/sockets/services';

@Injectable()
export class UserService extends EntityService<User> {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    protected readonly socketService: SocketService,
  ) {
    super(socketService, userRepository, 'user', 'username');
  }

  async getUser(id: number) {
    if (!id) {
      return null;
    }
    return await this.userRepository.findOneBy({ id: id });
  }
}
