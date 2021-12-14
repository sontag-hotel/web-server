export type KakaoParams = {
  clientID?: string;
  clientSecret?: string;
};
/* HttpResponse */
export type ExchangeTokenResponse = {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope?: string;
};

// TODO: 어떤 정보가 더 필요한지 확인 필요
export type FetchUserInfoResponse = {
  id: number;
};

/* Model */
export class Token {
  constructor(
    public tokenType: string,
    public accessToken: string,
    public expiresIn: number,
    public refreshToken: string,
    public refreshTokenExpiresIn: number,
    public scope?: string
  ) {
    this.tokenType = tokenType;
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
    this.refreshToken = refreshToken;
    this.refreshTokenExpiresIn = refreshTokenExpiresIn;
    this.scope = scope;
  }

  static fromResponseData(response: ExchangeTokenResponse): Token {
    return new Token(
      response.token_type,
      response.access_token,
      response.expires_in,
      response.refresh_token,
      response.refresh_token_expires_in,
      response.scope
    );
  }
}

export class Profile {
  constructor(public id: number) {
    this.id = id;
  }

  static fromResponseData(response: FetchUserInfoResponse): Profile {
    return new Profile(response.id);
  }
}
