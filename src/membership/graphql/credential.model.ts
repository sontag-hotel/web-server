import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Credential {
  @Field()
  token!: string;

  constructor(token: string) {
    this.token = token;
  }
}
