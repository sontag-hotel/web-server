import {Field, ArgsType, registerEnumType} from '@nestjs/graphql';
import {Theme} from '../constModel/const';

registerEnumType(Theme, {
  name: 'Theme',
});

@ArgsType()
export class GetCafeArgs {
  @Field(() => Theme)
  theme!: Theme;
}
