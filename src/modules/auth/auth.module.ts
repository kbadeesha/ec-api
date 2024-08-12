import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../../core/config/configuration';
import { PassportModule } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/user.service';
import { LocalStrategy, JwtStrategy } from './strategies';
import { AuthService } from './services';
import { VerificationService } from './services/verification.service';
import { UserRepository } from './repositories';
import { TypeOrmExModule } from '../typeorm-ex/typeorm-ex.module';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: configuration().jwt.secret,
    }),
    PassportModule,
    TypeOrmExModule.forCustomRepository([User, UserRepository]),
  ],
  controllers: [AuthController, UserController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
    UserService,
    VerificationService,
    UserRepository,
  ],
  exports: [JwtStrategy, AuthService],
})
export class AuthModule {}
