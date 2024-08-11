import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../../core/configs/configurations';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/user.service';
import { LocalStrategy, JwtStrategy } from './strategies';
import { AuthService } from './services';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: configuration().jwt.secret,
    }),
    PassportModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController, UserController],
  providers: [UserService],
  exports: [LocalStrategy, JwtStrategy, AuthService],
})
export class AuthModule {}
