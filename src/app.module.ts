import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
          entities: ['dist/**/*.entity{.ts,.js}'],
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
