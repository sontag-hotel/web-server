import {Field, ObjectType} from '@nestjs/graphql';
import {Theme} from '../constModel/const';
import {Types} from 'mongoose';

//실제 적용되는 가장 상위 카페 객체 모델
@ObjectType({description: 'cafe_users'})
export class CafeUser {
  @Field({description: 'object id'})
  _id?: string;

  @Field()
  cafeId!: string;

  @Field(() => String)
  userId!: Types.ObjectId;

  @Field(() => String)
  theme!: Theme;

  @Field()
  created_at!: Date;

  @Field()
  updated_at!: Date;
}
