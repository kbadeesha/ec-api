import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }
}
