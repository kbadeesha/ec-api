import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //   @Post('/user')
  //   async createUser(@Body body: CreateUserDto) {
  //     const user = await this.
  //   }

  @Get(':id')
  async findUser(@Param('id') id: number) {
    return await this.userService.getUser(id);
  }
}
