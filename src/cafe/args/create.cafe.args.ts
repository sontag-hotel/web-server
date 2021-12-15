import {
  Field,
  InputType , 
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
  // @Field(() => CreateCafeArgsObject)
  // args!: CreateCafeArgsObject;
}

