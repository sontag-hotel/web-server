import {URLSearchParams} from 'url';
import type {
  ExchangeTokenResponse,
  FetchUserInfoResponse,
  KakaoParams,
} from './type';
import {Token, Profile} from './type';
import axios from 'axios';

// Kakao REST API Documentation
// https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api
export class KakaoClient {
  /* Kakao API */
  public static KAKAO_AUTH_HOST = 'https://kauth.kakao.com';
  public static KAKAO_API_HOST = 'https://kapi.kakao.com';

  public static get EXCHANGE_TOKEN_URI(): string {
    return `${this.KAKAO_AUTH_HOST}/oauth/token`;
  }

  public static get FETCH_USER_INFO_URI(): string {
    return `${this.KAKAO_API_HOST}/v2/user/me`;
  }

  private clientID: string;
  private clientSecret: string;

  constructor({clientID, clientSecret}: KakaoParams) {
    if (!(clientID ?? process.env.KAKAO_CLIENT_ID)) {
      throw new Error('Kakao client id is required');
    }

    if (!(clientSecret ?? process.env.KAKAO_CLIENT_SECRET)) {
      throw new Error('Kakao client secret is required');
    }

    this.clientID = (clientID ?? process.env.KAKAO_CLIENT_ID)!;
    this.clientSecret = (clientSecret ?? process.env.KAKAO_CLIENT_SECRET)!;
  }

  async exchangeToken(
    authorizationCode: string,
    redirectURI: string
  ): Promise<Token> {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', authorizationCode);
    params.append('redirect_uri', redirectURI);
    params.append('client_id', this.clientID);
    params.append('client_secret', this.clientSecret);

    const response = await axios.post<ExchangeTokenResponse>(
      KakaoClient.EXCHANGE_TOKEN_URI,
      {
        params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    );

    return Token.fromResponseData(response.data);
  }

  async fetchUserProfile(accessToken: string): Promise<Profile> {
    const response = await axios.post<FetchUserInfoResponse>(
      KakaoClient.FETCH_USER_INFO_URI,
      {
        Headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    );

    return Profile.fromResponseData(response.data);
  }
}
