import * as dotenv from 'dotenv';
dotenv.config({
  path: '../../../.env',
});

export default () => ({
  app: {
    port: Number(process.env.APP_PORT) || 3000,
    adminPassword: process.env.APP_ADMIN_DEFAULT_PASSWORD || 'admin@123',
    allowedOrigins: String(process.env.APP_ALLOWED_ORIGINS).split(',') || [],
    webUrl: process.env.APP_WEB_URL || 'http://localhost:4200',
    emailVerifyUrl: process.env.APP_EMAIL_VERIFY_URL,
    passwordResetUrl: process.env.APP_PASSWORD_RESET_URL,
  },
  database: {
    type: process.env.DATABASE_TYPE || 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'qwerty123',
    schema: process.env.DATABASE_SCHEMA || 'ecom_db',
    port: Number(process.env.DATABASE_PORT) || 3306,
    charset: 'utf8mb4',
    synchronize: process.env.DATABASE_SYNC === 'true',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    secretExp: process.env.JWT_SECRET_EXP,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshSecretExp: process.env.JWT_REFRESH_SECRET_EXP,
  },
});
