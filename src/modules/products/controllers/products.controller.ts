import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }
}
