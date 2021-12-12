import {ArgsType, Field} from '@nestjs/graphql';

@ArgsType()
export class LoginKakaoArgs {
  @Field()
  code!: string;
  @Field()
  redirectURI!: string;
}
