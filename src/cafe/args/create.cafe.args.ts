import {Field, InputType, registerEnumType} from '@nestjs/graphql';
import {Day, Thema /*,  DayType,  ThemaType*/} from '../constModel/const';

registerEnumType(Day, {
  name: 'Day',
});

registerEnumType(Thema, {
  name: 'Thema',
});

@InputType({description: 'New cafe data'})
export class CreateCafeArgs {
  @Field()
  name?: string;

  @Field()
  address?: string;

  @Field(() => [Day])
  day?: Day[];

  @Field()
  startTime?: string;

  @Field()
  endTime?: string; 

  @Field(() => [Thema])
  thema?: Thema[];

  @Field()
  contact?: string;

  @Field()
  locationX?: number;

  @Field()
  locationY?: number;
}
