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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

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
