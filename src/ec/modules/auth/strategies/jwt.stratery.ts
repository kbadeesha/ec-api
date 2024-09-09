import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', // Replace with your secret key or use env variables
    });
  }

  async validate(payload: any) {
    // Fetch the user from the database using the information in the JWT token
    const user = await this.usersService.findByEmail(payload.sub); // Replace with your findById logic
    return user;
  }
}
