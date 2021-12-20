import {ArgsType, Field, InputType} from '@nestjs/graphql';

@InputType()
class NewAccountInput {
  @Field({description: '이름'})
  name!: string;

  @Field({description: '소개'})
  introductionDesc!: string;
}

@ArgsType()
export class SignupArgs {
  @Field(() => NewAccountInput)
  input!: NewAccountInput;

  @Field({
    description: '구글 액세스 토큰',
  })
  accessToken!: string;
}
