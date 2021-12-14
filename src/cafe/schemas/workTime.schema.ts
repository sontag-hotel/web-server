import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Day} from '../constModel/const';
import {Document} from 'mongoose';

export type WorkTimeDocument = WorkTime & Document;

@Schema()
export class WorkTime {
  @Prop()
  day!: Day[] | [];

  @Prop()
  startTime!: string;

  @Prop()
  endTime!: string;
}

export const WorkTimeSchema = SchemaFactory.createForClass(WorkTime);
