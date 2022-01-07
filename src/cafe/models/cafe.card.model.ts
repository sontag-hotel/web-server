import {Field, ObjectType} from '@nestjs/graphql';
import {Theme} from '../constModel/const';
import {CafeUser} from './cafe.user.model';
import {Info, Location} from './cafe.model';

@ObjectType({description: 'cafe.cafeUserList'})
class CafeUserList {
  @Field(() => [CafeUser])
  userList!: CafeUser[];

  @Field()
  count!: number;
}

//카페 카드 상위 객체
@ObjectType({description: 'cafe card'})
export class CafeCard {
  @Field({description: 'object id'})
  _id?: string;

  @Field()
  name!: string;

  @Field()
  info!: Info;

  @Field()
  contact!: string;

  @Field({nullable: false})
  location!: Location;

  @Field(() => [Theme])
  theme!: Theme[];

  @Field()
  kakaoPlaceId!: number;

  @Field()
  cafeUserList!: CafeUserList;

  @Field()
  created_at!: Date;

  @Field()
  updated_at!: Date;
}
