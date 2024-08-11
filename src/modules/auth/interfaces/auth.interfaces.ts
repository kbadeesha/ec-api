import { User } from 'src/modules/auth/entities/user.entity';

export interface ITokenData {
  sub: number;
  email: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenResponse extends ITokens {
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

// noinspection JSUnusedGlobalSymbols
export interface IAuthResponse {
  tokens: ITokenResponse;
  user: User;
}
