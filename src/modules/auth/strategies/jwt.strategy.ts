import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthErrors } from 'src/modules/auth/responses/auth.error.responses';
import { User } from 'src/modules/auth/entities/user.entity';
import { UserService } from '../services';
import configuration from '../../../core/configs/configurations';
import { ITokenData } from '../interfaces';
import { cookieExtractor } from '../utils/auth.extractors';
import { userRelations } from '../repositories';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: configuration().jwt.secret,
    });
  }

  // noinspection JSUnusedGlobalSymbols
  async validate(jwtPayload: ITokenData): Promise<User> {
    try {
      const user = await this.userService.get(jwtPayload.sub, {
        relations: userRelations,
      });
      if (!user) {
        return Promise.reject(
          new UnauthorizedException(AuthErrors.AUTH_401_INVALID_TOKEN),
        );
      }
      return user;
    } catch (err: any) {
      //   LoggerService.error(err);
      return Promise.reject(
        new UnauthorizedException(AuthErrors.AUTH_401_INVALID_TOKEN),
      );
    }
  }
}
