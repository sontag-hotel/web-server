import {Field, ArgsType, registerEnumType} from '@nestjs/graphql';
import {Thema} from '../constModel/const';

registerEnumType(Thema, {
  name: 'Thema',
});

//테마별 카페 검색시 arg 구조
@ArgsType()
export class GetCafeArgs {
  @Field(() => Thema)
  thema!: Thema;
}
