import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Day, Thema } from '../constModel/const';
import { Types } from 'mongoose';


export type CafeDocument = Cafe & Document;

@Schema()
export class Cafe {
  @Prop()
  _id!: Types.ObjectId;

  @Prop()
  name!: string;

  @Prop(raw({
    info!: {
        address: String,
        workTime: {
            day: [{type: String, enum: Day}],
            startTime: String || null,
            endTime: String || null,
        }
    }

  }))

  @Prop()
  thema!: Thema[] | []

  @Prop()
  created_at!: Date;

  @Prop()
  updated_at!: Date;
}

export const CafeSchema = SchemaFactory.createForClass(Cafe);
