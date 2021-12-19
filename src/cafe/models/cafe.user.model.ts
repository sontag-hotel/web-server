import {Field, ObjectType} from '@nestjs/graphql';
import {Theme} from '../constModel/const';

//실제 적용되는 가장 상위 카페 객체 모델
@ObjectType({description: 'cafe_users'})
export class CafeUser {
  @Field({description: 'object id'})
  _id?: string;

  @Field()
  cafeId!: string;

  @Field()
  userId!: string;

  @Field(() => String)
  theme!: Theme;

  @Field()
  created_at!: Date;

  @Field()
  updated_at!: Date;
}
