import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums';
import { Exclude } from 'class-transformer';
import { Status } from 'src/core/enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({ type: 'enum', enum: Role, nullable: false })
  role: Role;

  @Column()
  password: string;

  @Column({ nullable: false })
  @Exclude()
  salt?: string;

  @Column({ length: 20, nullable: false })
  firstName: string;

  @Column({ length: 20, nullable: false })
  lastName: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status | string;
}
