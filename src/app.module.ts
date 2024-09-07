import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { User } from './users/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './products/products.entity';
import configurations from './core/config/configurations';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

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
          type: configurations().database
            .type as MysqlConnectionOptions['type'],
          database: config.get<string>('DB_NAME'),
          port: configurations().database.port,
          username: configurations().database.user,
          password: configurations().database.password,
          entities: [User, Product],
          host: configurations().database.host,
          synchronize: configurations().database.synchronize,
        };
      },
    }),
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
