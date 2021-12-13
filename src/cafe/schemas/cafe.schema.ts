import {Prop, Schema, raw, SchemaFactory} from '@nestjs/mongoose';
import {DayArr,/* ThemaArr,*/ Thema} from '../constModel/const';
import {SchemaTypes, Types /*, Document*/} from 'mongoose';
// import * as mongoose from 'mongoose';

// export const CafeSchema = new mongoose.Schema({
//   _id: Types.ObjectId,
//   name: String,
//   info: {
//     address: String,
//     workTime: {
//       day: {
//         type: String,
//         enum: DayArr
//       },
//       startTime: String || null,
//       endTime: String || null
//     }
//   },
//   thema: {
//     type: String,
//     enum: ThemaArr
//   },
//   created_at: Date,
//   updated_at: Date
// })

export type CafeDocument = Cafe & Document;

@Schema({timestamps: true})
export class Cafe {
  @Prop({type: SchemaTypes.ObjectId})
  _id!: Types.ObjectId;

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
