import { Injectable } from '@nestjs/common';
import { AuthService } from '../services';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // noinspection JSUnusedGlobalSymbols
  async validate(username: string, password: string): Promise<User> {
    return await this.authService.authenticate(username, password);
  }
}
