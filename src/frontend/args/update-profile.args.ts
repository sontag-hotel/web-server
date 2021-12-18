import {ArgsType, Field, InputType} from '@nestjs/graphql';

@InputType()
class UpdateProfileInput {
  @Field({description: '수정할 이름', nullable: true})
  name?: string;

  @Field({description: '수정할 소개', nullable: true})
  introductionDesc?: string;
}

@ArgsType()
export class UpdateProfileArgs {
  @Field(() => UpdateProfileInput)
  input!: UpdateProfileInput;
}
