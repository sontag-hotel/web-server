import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ObjectType} from '@nestjs/graphql';
import {Document} from 'mongoose';
import {Day, Thema} from '../constModel/const';

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

@Schema({collection: 'cafes', versionKey: false})
export class Cafe {
  // @Prop()
  // _id?: string;

  @Prop()
  name!: string;

  @Prop()
  info!: Info;

  @Prop()
  contact!: string;

  @Prop()
  location!: Location;

  @Prop()
  thema!: Thema[];

  @Prop()
  created_at!: Date;

  @Prop()
  updated_at!: Date;
}

export const CafeSchema = SchemaFactory.createForClass(Cafe);
