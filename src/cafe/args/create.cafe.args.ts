import {Field, InputType, registerEnumType} from '@nestjs/graphql';
import {Day, Theme} from '../constModel/const';

//enum 형식 지정
registerEnumType(Day, {
  name: 'Day',
});

registerEnumType(Theme, {
  name: 'Theme',
});

//새로운 카페 등록 시 input 구조 지정
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

  @Field(() => Theme, {nullable: true})
  theme?: Theme;

  @Field({nullable: true})
  contact?: string;

  @Field({nullable: true})
  locationX?: number;

  @Field({nullable: true})
  locationY?: number;
}
