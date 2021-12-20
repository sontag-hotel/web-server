import {Field, ObjectType} from '@nestjs/graphql';
import type {Schema as MongooseSchema} from 'mongoose';

@ObjectType()
export class Me {
  @Field(() => String)
  _id!: MongooseSchema.Types.ObjectId;

  @Field({description: '이름'})
  name!: string;

  @Field({description: '소개'})
  introductionDesc!: string;
}
