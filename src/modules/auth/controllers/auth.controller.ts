import { Controller } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('user')
export class AuthController {
  constructor(private readonly userService: AuthService) {}
  //   @Post('/user')
  //   async createAuth(@Body body: CreateAuthDto) {
  //     const user = await this.
  //   }
}
