import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ObjectType} from '@nestjs/graphql';
import {Document} from 'mongoose';
import {Day, Theme} from '../constModel/const';

export type CafeDocument = Cafe & Document;

@ObjectType()
class WorkTime {
  @Prop()
  day!: Day[];

  @Prop()
  startTime!: string;

  @Prop()
  endTime!: string;
}

@ObjectType()
class Info {
  @Prop()
  address!: string;

  @Prop()
  workTime!: WorkTime;
}

@ObjectType()
class Location {
  @Prop()
  x!: number;

  @Prop()
  y!: number;
}

//mongodb에 적용되는 cafe 스키마
@Schema({collection: 'cafes', versionKey: false})
export class Cafe {
  @Prop()
  name!: string;

  @Prop()
  info!: Info;

  @Prop()
  contact!: string;

  @Prop()
  location!: Location;

  @Prop()
  theme!: Theme[];

  @Prop()
  kakaoPlaceId!: number;

  @Prop()
  created_at!: Date;

  @Prop()
  updated_at!: Date;
}

export const CafeSchema = SchemaFactory.createForClass(Cafe);
