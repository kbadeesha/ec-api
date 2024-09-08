import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { Serialize } from 'src/core/interceptors/serialize.interceptor';
import { ProductDto } from './dtos/product.dto';
import { AdminGuard } from 'src/core/guards/admin.guard';
import { CurrentUser } from '../users/decorators/current-user.decorators';
import { User } from '../users/user.entity';

// UseGuards(AuthGuard, AdminGuard);
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  @Serialize(ProductDto)
  createProduct(@Body() body: CreateProductDto, @CurrentUser() user: User) {
    return this.productService.create(body, user);
  }
}
