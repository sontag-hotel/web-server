import {Field, ObjectType} from '@nestjs/graphql';
import {Paginated} from '@libs/common/graphql/paginated';

@ObjectType()
export class User {
  @Field()
  _id!: string;
  @Field()
  name!: string;
}

@ObjectType()
export class UserList extends Paginated(User) {}
