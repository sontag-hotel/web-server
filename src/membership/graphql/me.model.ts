import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Me {
  @Field()
  id!: string;

  @Field()
  name!: string;
}
