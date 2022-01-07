import {BaseExtensionsException} from '../../common/exceptions/graphql.exception';

export class NullTokenException extends BaseExtensionsException {
  constructor() {
    super({
      message: 'TOKEN_NULL_ERROR',
      description: '토큰이 없습니다.',
    });
  }
}

export class WrongTokenException extends BaseExtensionsException {
  constructor() {
    super({
      message: 'UNAUTHORIZED_TOKEN',
      description: '잘못된 토큰을 통한 요청입니다.',
    });
  }
}

export class ExpiredTokenException extends BaseExtensionsException {
  constructor() {
    super({
      message: 'TOKEN_EXPIRED',
      description: '해당 토큰은 만료된 토큰입니다.',
    });
  }
}
