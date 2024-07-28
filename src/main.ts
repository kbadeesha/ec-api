/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asdf'],
    }),
  );

  //--------- swagger begin --------//
  // const config = new DocumentBuilder()
  //   .setTitle('API swagger documentation')
  //   .setDescription('The API description')
  //   .setVersion('1.0')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('swagger', app, document);
  //--------- swagger end --------//

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
