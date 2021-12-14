import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType({description: 'cafe.location'})
export class Location {
  @Field()
  x!: number;

  @Field()
  y!: number;
}
