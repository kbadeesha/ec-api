import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dta';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('User')
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  @ApiCreatedResponse({
    description: 'User created successfully!',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'User create failed!',
  })
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
  }
}
