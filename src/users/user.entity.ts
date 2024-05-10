import { ApiProperty } from '@nestjs/swagger';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id', this.id);
  }
  @AfterUpdate()
  logUpdateAfterUpdate() {
    console.log('Updated user with id', this.id);
  }
  @AfterRemove()
  logRemoveAfterRemove() {
    console.log('Removed user with id', this.id);
  }
}
