export type KakaoParams = {
  clientID?: string;
  clientSecret?: string;
};
/* HttpResponse */
export type ExchangeTokenResponse = {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
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
      response.tokenType,
      response.accessToken,
      response.expiresIn,
      response.refreshToken,
      response.refreshTokenExpiresIn,
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
