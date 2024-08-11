import { Request } from 'express';
import { ACCESS_TOKEN_COOKIE_NAME } from '../services';

export const cookieExtractor = (request: Request): any => {
  return request?.signedCookies[ACCESS_TOKEN_COOKIE_NAME] || null;
};
