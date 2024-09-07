import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/users/decorators/role.decorators';
import { AuthErrors } from 'src/users/responses/auth.error.responses';
import { User } from 'src/users/user.entity';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<any[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // If no roles are defined, allow access
    }
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) {
      throw new ForbiddenException(AuthErrors.AUTH_403_ROLE_FORBIDDEN);
    }
    if (requiredRoles.some((role) => request.currentUser.role.includes(role))) {
      console.log(requiredRoles);
      console.log(request.currentUser.role);
      return true;
    }
    throw new ForbiddenException(AuthErrors.AUTH_403_ROLE_FORBIDDEN);
  }
}
