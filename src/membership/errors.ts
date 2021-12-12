import {BaseExtensionsException} from '../common/exceptions/graphql.exception';
export class KakaoLoginFailedException extends BaseExtensionsException {
  constructor(kakaoProfile: {accessToken: string}) {
    super({
      message: 'KAKAO_LOGIN_FAILED',
      description: '카카오 로그인에 실패하였습니다.',
      payload: kakaoProfile,
    });
  }
}

export class KakaoAuthFailedException extends BaseExtensionsException {
  constructor() {
    super({
      message: 'KAKAO_AUTH_FAILED',
      description: '카카오 인증에 실패하였습니다.',
    });
  }
}

export class UnexpectedAccountException extends BaseExtensionsException {
  constructor() {
    super({
      message: 'UNEXPECTED_ACCOUNT_INFO',
      description:
        '카카오 계정과 연결된 계정 정보를 찾을 수 없습니다. 관리자에게 문의하세요.',
    });
  }
}

export class DuplicatedAccountException extends BaseExtensionsException {
  constructor() {
    super({
      message: 'DUPLICATED_ACCOUNT',
      description: '이미 연동된 카카오 계정이 존재합니다.',
    });
  }
}
