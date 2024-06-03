import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { User } from './users/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './products/products.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          database: config.get<string>('DB_NAME'),
          port: 3306,
          username: 'root',
          password: 'qwerty123',
          entities: [User, Product],
          host: 'localhost',
          synchronize: true,
        };
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   database: 'ecom_db',
    //   port: 3306,
    //   username: 'root',
    //   password: 'qwerty123',
    //   entities: [User],
    //   host: 'localhost',
    //   synchronize: true,
    // }),
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
