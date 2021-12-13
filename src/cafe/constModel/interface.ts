import {DayType, ThemaType} from './const'; //인터페이스에는 타입을 import

export interface CreateArgs {
  name?: string;
  address?: string;
  day?: DayType[];
  startTime?: string;
  endTime?: string;
  thema?: ThemaType[];
}

export interface GetCafeArgs {
  _id?: string;
}
