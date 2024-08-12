import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: Role, nullable: false })
  role: Role;

  @Column()
  password: string;

  @Column({ nullable: false })
  @Exclude()
  salt?: string;
}
