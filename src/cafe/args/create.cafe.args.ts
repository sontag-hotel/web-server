import {
  Field,
  InputType,
  // ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {Day, Thema /*,  DayType,  ThemaType*/} from '../constModel/const';

registerEnumType(Day, {
  name: 'Day',
});

registerEnumType(Thema, {
  name: 'Thema',
});

// @ObjectType()
// class CreateCafeArgsObject {
// }

@InputType({description: 'New cafe create mutation args'})
export class CreateCafeArgs {
  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  address?: string;

  @Field(() => [Day], {nullable: true})
  day?: Day[];

  @Field({nullable: true})
  startTime?: string;

  @Field({nullable: true})
  endTime?: string;

  @Field(() => [Thema], {nullable: true})
  thema?: Thema[];

  @Field({nullable: true})
  contact?: string;

  @Field({nullable: true})
  locationX?: number;

  @Field({nullable: true})
  locationY?: number;
  // @Field(() => CreateCafeArgsObject)
  // args!: CreateCafeArgsObject;
}
