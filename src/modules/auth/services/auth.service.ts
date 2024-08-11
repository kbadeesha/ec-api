import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';

export const ACCESS_TOKEN_COOKIE_NAME = 'Authorization';
export const REFRESH_TOKEN_COOKIE_NAME = 'Refresh';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async authenticate() {
    // try {
    //   const user = await this.userService.getOne({
    //     where: { username },
    //     relations: userRelations,
    //   });
    //   if (!user) {
    //     return Promise.reject(
    //       new UnauthorizedException(AuthErrors.AUTH_401_INVALID),
    //     );
    //   }
    //   if (!AuthService.verifyHash(password, user.password, user.salt)) {
    //     return Promise.reject(
    //       new UnauthorizedException(AuthErrors.AUTH_401_INVALID),
    //     );
    //   }
    //   if (user.status === Status.PENDING) {
    //     return Promise.reject(
    //       new ForbiddenException(AuthErrors.AUTH_403_PENDING),
    //     );
    //   }
    //   if (user.status !== Status.ACTIVE) {
    //     return Promise.reject(
    //       new UnauthorizedException(AuthErrors.AUTH_401_NOT_ACTIVE),
    //     );
    //   }
    //   return user;
    // } catch (err: any) {
    //   LoggerService.error(err);
    //   throw new UnauthorizedException(AuthErrors.AUTH_401_INVALID);
    // }
  }
}
