import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VerificationType } from '../enums/verification-type.enum';
import { User } from './user.entity';
import { FKConstraint } from '../../../core/enums/constraint.enum';

@Entity({ name: 'verifications' })
export class Verification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  token: string;

  @Column({ type: 'enum', enum: VerificationType, nullable: false })
  type: VerificationType;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ foreignKeyConstraintName: FKConstraint.VERIFICATION_USER })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
