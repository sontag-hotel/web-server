import {Field, ArgsType, registerEnumType} from '@nestjs/graphql';
import {Theme} from '../constModel/const';

registerEnumType(Theme, {
  name: 'Theme',
});

//테마별 카페 검색시 arg 구조
@ArgsType()
export class GetCafeArgs {
  @Field(() => Theme)
  theme!: Theme;
}
