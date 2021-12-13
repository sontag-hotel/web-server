// import {createUnionType} from '@nestjs/graphql';
// import {/*ObjectType, Field*/ registerEnumType} from '@nestjs/graphql';

export const DayArr = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
export const ThemaArr = ['MOOD', 'WORK', 'TASTE'];

export enum Day {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}
export enum Thema {
  MOOD = 'MOOD',
  WORK = 'WORK',
  TASTE = 'TASTE',
}

export type DayType = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export type ThemaType = 'MOOD' | 'WORK' | 'TASTE';

// @ObjectType()
// export class DayArg {
//   @Field({description: 'day arg'})
//   day?: string[];
// }
// export const DayUnion = createUnionType({
//   name: 'DayUnion',
//   types: () => ['MON', 'TUE'],
// });