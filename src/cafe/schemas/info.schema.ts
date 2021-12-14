import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {WorkTimeSchema, WorkTime} from './workTime.schema';

export type InfoDocument = Info & Document;

@Schema()
export class Info {
  @Prop()
  address!: string;

  @Prop({type: WorkTimeSchema})
  workTime!: WorkTime;
}

export const InfoSchema = SchemaFactory.createForClass(Info);
