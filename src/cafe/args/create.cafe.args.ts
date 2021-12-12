import { Field, InputType } from '@nestjs/graphql';
import { Day, Thema } from '../constModel/const'

@InputType()
export class CreateCafeArgs {
  @Field()
  name?: string;

  @Field()
  address?: string;

  @Field(() => [Day])
  day?: string[];

  @Field()
  startTime?: string;

  @Field()
  endTime?: string;

  @Field(() => [Thema])
  thema?: string[]
  
}
