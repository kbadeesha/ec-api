import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'user email',
    example: 'jhon@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'user password',
    example: 'qwerty123',
  })
  @IsString()
  password: string;
}
