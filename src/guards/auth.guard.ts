import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/users/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    if (!userId) {
      console.log('first');
      throw new UnauthorizedException('User not authenticated');
    }

    // Fetch the user from the database based on userId
    const user = await this.authService.validateUser(userId);
    if (!user) {
      console.log('fxdrst');
      throw new UnauthorizedException('User not found');
    }

    // Attach the user to the request
    request.user = user;

    return true;
  }
}
