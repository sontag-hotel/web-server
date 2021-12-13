import {Field, ObjectType} from '@nestjs/graphql';
import type {Schema as MongooseSchema} from 'mongoose';

@ObjectType()
export class Me {
  @Field(() => String)
  _id!: MongooseSchema.Types.ObjectId;

  @Field()
  name!: string;
}
