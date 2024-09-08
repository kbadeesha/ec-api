import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ProductsModule } from './ec/modules/products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './ec/modules/products/products.entity';
import configurations from './core/config/configurations';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { User } from './ec/modules/users/user.entity';
import { UsersModule } from './ec/modules/users/users.module';

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
