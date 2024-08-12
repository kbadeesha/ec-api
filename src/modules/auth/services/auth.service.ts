import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userRelations } from '../repositories';
import { AuthErrors } from '../responses';
import { Status } from 'src/core/enums';
import { LoggerService } from 'src/core/services';
import { User } from '../entities';
import { pbkdf2Sync } from 'crypto';

export const ACCESS_TOKEN_COOKIE_NAME = 'Authorization';
export const REFRESH_TOKEN_COOKIE_NAME = 'Refresh';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async authenticate(username: string, password: string): Promise<User> {
    try {
      const user = await this.userService.getOne({
        where: { username },
        relations: userRelations,
      });
      if (!user) {
        return Promise.reject(
          new UnauthorizedException(AuthErrors.AUTH_401_INVALID),
        );
      }
      if (!AuthService.verifyHash(password, user.password, user.salt)) {
        return Promise.reject(
          new UnauthorizedException(AuthErrors.AUTH_401_INVALID),
        );
      }
      if (user.status === Status.PENDING) {
        return Promise.reject(
          new ForbiddenException(AuthErrors.AUTH_403_PENDING),
        );
      }
      if (user.status !== Status.ACTIVE) {
        return Promise.reject(
          new UnauthorizedException(AuthErrors.AUTH_401_NOT_ACTIVE),
        );
      }
      return user;
    } catch (err: any) {
      LoggerService.error(err);
      throw new UnauthorizedException(AuthErrors.AUTH_401_INVALID);
    }
  }
  public static verifyHash(
    password: string,
    hash: string,
    salt: string,
  ): boolean {
    const generatedHash = pbkdf2Sync(
      password,
      salt,
      10000,
      64,
      'sha512',
    ).toString('hex');
    return hash === generatedHash;
  }
  getMe(id: number): Promise<User> {
    return this.userService.get(id, { relations: userRelations });
  }
}
