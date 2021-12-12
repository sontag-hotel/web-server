import {ArgsType, Field, InputType} from '@nestjs/graphql';

@InputType()
export class NewUserInput {
  @Field({description: '유저이름'})
  name!: string;
}

@ArgsType()
export class CreateUserArgs {
  @Field(() => NewUserInput, {
    description: '유저 생성시 필요한 정보',
  })
  input!: NewUserInput;
}
