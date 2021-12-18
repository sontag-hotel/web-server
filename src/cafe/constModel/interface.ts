import {DayType, ThemeType} from './const'; //인터페이스에는 타입을 import
import {Document, Types} from 'mongoose';

export interface CreateArgs {
  name?: string;
  address?: string;
  day?: DayType[];
  startTime?: string;
  endTime?: string;
  theme?: ThemeType[];
  contact?: string;
  locationX?: number;
  locationY?: number;
}

export interface GetCafeArgs {
  theme: ThemeType;
  //   _id?: string;
}

export interface Cafe extends Document {
  readonly _id: Types.ObjectId;
  readonly name: string | null;
  readonly info: {
    address: string | null;
    workingTime: {
      day: DayType[] | [];
      startTime: string | null;
      endTime: string | null;
    };
  };
  readonly theme: ThemeType[] | [];
  readonly created_at: Date;
  readonly updated_at: Date;
}
