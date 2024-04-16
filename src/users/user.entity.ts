import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    description: 'user id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'user email',
  })
  @Column()
  email: string;

  @ApiProperty({
    description: 'user password',
  })
  @Column()
  password: string;
}
