import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  create(productDto: CreateProductDto, user: User) {
    const product = this.repo.create(productDto);
    product.user = user;
    return this.repo.save(product);
  }
}
