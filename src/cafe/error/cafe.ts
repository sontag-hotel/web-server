import {BaseExtensionsException} from '../../common/exceptions/graphql.exception';

export class ParamsError extends BaseExtensionsException {
  constructor(args: unknown) {
    super({
      message: 'PARAMETER_MISSING',
      description: `입력값이 누락되었습니다. : ${args}`,
    });
  }
}

export class DuplicateCafeUserThemeError extends BaseExtensionsException {
  constructor() {
    super({
      message: 'DUPLICATED_DATA',
      description: '해당 카페는 이미 선택한 테마로 추가되어 있습니다.',
    });
  }
}

// export class ExistedCafeException extends BaseExtensionsException {
//   constructor() {
//     super({
//       message: 'CAFE_DATA',
//       description: '토큰이 없습니다.',
//     });
//   }
// }
