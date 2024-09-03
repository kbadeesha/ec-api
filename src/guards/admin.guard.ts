import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from 'src/users/enums/roles.enum';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.currentUser) {
      return false;
    }
    if (
      request.currentUser.role === Role.ADMIN ||
      request.currentUser.role === Role.SUPER_ADMIN
    ) {
      return true;
    } else {
      return false;
    }
  }
}
