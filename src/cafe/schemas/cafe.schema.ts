import {Prop, Schema, raw, SchemaFactory} from '@nestjs/mongoose';
import {DayArr, Thema} from '../constModel/const';
import {/*SchemaTypes, Types,*/ Document} from 'mongoose';

export type CafeDocument = Cafe & Document;

@Schema({timestamps: true})
export class Cafe {
  @Prop({type: String})
  _id!: string;

  @Prop()
  name!: string;

  @Prop(
    raw({
      info: {
        address: String,
        workTime: {
          day: [{type: String, enum: DayArr}],
          startTime: String || null,
          endTime: String || null,
        },
      },
    })
  )
  @Prop()
  thema!: Thema[] | [];

  @Prop()
  created_at!: Date;

  @Prop()
  updated_at!: Date;
}

export const CafeSchema = SchemaFactory.createForClass(Cafe);
