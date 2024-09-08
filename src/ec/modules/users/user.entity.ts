import {
  // AfterInsert,
  // AfterRemove,
  // AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './enums/roles.enum';
import { Product } from 'src/ec/modules/products/products.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  role: Role;

  @Column()
  phone: string;

  @Column()
  address: string;

  // @Column({ default: true })
  // isAdmin: boolean;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
  // @AfterInsert()
  // logInsert() {
  //   console.log('Inserted user with id', this.id);
  // }
  // @AfterUpdate()
  // logUpdateAfterUpdate() {
  //   console.log('Updated user with id', this.id);
  // }
  // @AfterRemove()
  // logRemoveAfterRemove() {
  //   console.log('Removed user with id', this.id);
  // }
}
