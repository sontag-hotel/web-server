import {Field, ArgsType , registerEnumType} from '@nestjs/graphql';
import { Thema } from '../constModel/const'

registerEnumType(Thema, {
  name: 'Thema',
});

@ArgsType()
export class GetCafeArgs {
  @Field(()=> Thema)
  thema!: Thema
}
