/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { config } from 'dotenv';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import configuration from './core/config/configuration';
import { LoggerService } from './core/services/logger.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AuthErrors } from './modules/auth/responses';
import { AllExceptionsFilter } from './core/filters';
config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new LoggerService(),
    bodyParser: false,
  });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.setGlobalPrefix('api');
  app.use(cookieParser(configuration().cookies.secret));
  app.use(helmet());
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || configuration().app.allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new UnauthorizedException(AuthErrors.AUTH_401_CORS));
      }
    },
    credentials: true,
  });
  // app.useStaticAssets(join(__dirname, "..", "public"));
  // app.setBaseViewsDir(join(__dirname, "..", "views"));
  // app.setViewEngine("hbs");
  await app.listen(configuration().app.port);
}
// noinspection JSIgnoredPromiseFromCall
bootstrap();
