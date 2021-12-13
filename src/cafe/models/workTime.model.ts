import {Field, ObjectType, registerEnumType} from '@nestjs/graphql';
import {Day /*, DayType*/ /*, DayArg*/} from '../constModel/const';

registerEnumType(Day, {
  name: 'Day',
});

@ObjectType({description: 'cafe'})
export class WorkTime {
  @Field(() => [Day])
  day!: Day[];

  @Field({nullable: true})
  startTime!: string;

  @Field({nullable: true})
  endTime!: string;
}

//     workTime: {
//         day: Day[] | null;
//         startTime: string | null;
//         endTime: string | null
//     }
