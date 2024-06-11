import * as dotenv from 'dotenv';
import { DatabaseType } from 'typeorm';

dotenv.config();

export default () => ({
  app: {
    port: Number(process.env.PORT || process.env.APP_PORT) || 3000,
  },
  database: {
    type: (process.env.DATABASE_TYPE || 'mysql') as DatabaseType,
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'qwerty123',
    database: process.env.DATABASE_NAME || 'ecom_db',
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: Number(process.env.JWT_EXP) || 60 * 60 * 24,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: Number(process.env.JWT_REFRESH_EXP) || 60 * 60 * 24 * 30,
  },
});
