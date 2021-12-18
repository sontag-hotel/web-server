import {
  Field,
  InputType , 
  // ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {Day, Theme /*,  DayType,  ThemeType*/} from '../constModel/const';

registerEnumType(Day, {
  name: 'Day',
});

registerEnumType(Theme, {
  name: 'Theme',
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
  
  @Field(() => [Theme])
  theme?: Theme[];
  
  @Field()
  contact?: string;
  
  @Field()
  locationX?: number;
  
  @Field()
  locationY?: number;
  // @Field(() => CreateCafeArgsObject)
  // args!: CreateCafeArgsObject;
}

