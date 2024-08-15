import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ProductDto } from './dtos/product.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorators';
import { User } from 'src/users/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ProductDto)
  createProduct(@Body() body: CreateProductDto, @CurrentUser() user: User) {
    return this.productService.create(body, user);
  }
}
