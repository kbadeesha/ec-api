/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
config();
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asdf'],
    }),
  );

  //--------- validation pipes begin --------//
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  ),
    //--------- validation pipes end --------//
    await app.listen(3000);
}
bootstrap();
