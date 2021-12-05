import {ApolloError} from 'apollo-server-core';

export interface ErrorResponse {
  description: string;
  timestamp: string;
  payload: unknown;
}

type BaseExtensionsExceptionParams = {
  message: string;
  description: string;
  code?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

export class BaseExtensionsException
  extends ApolloError
  implements ErrorResponse
{
  public description: string;
  public timestamp: string;
  public payload: unknown;

  toErrorResponse(): ErrorResponse {
    return {
      description: this.description,
      timestamp: this.timestamp,
      payload: this.payload,
    };
  }

  constructor(params: BaseExtensionsExceptionParams) {
    const {message, code, description, payload} = params;

    super(message, code);
    this.description = description;
    this.timestamp = new Date().toISOString();
    this.payload = payload ?? {};
  }
}

export class UnauthorizedException extends BaseExtensionsException {
  constructor(payload?: unknown) {
    super({
      message: 'UNAUTHORIZED',
      description: '접근 권한이 없습니다.',
      payload,
    });
  }
}
