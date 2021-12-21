import {DayType, ThemeType} from './const'; //인터페이스에는 타입을 import
import {Types} from 'mongoose';

//카페 생성시 argument interface
export interface CreateArgs {
  name?: string;
  address?: string;
  day?: DayType[];
  startTime?: string;
  endTime?: string;
  theme?: string;
  contact?: string;
  locationX?: number;
  locationY?: number;
  kakaoPlaceId?: number;
  userId?: Types.ObjectId;
}

//테마별 카페 조회시 interface
export interface GetCafeArgs {
  theme: ThemeType;
}
