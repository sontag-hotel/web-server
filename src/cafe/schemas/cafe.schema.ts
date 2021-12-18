import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Theme} from '../constModel/const';
import {/*SchemaTypes, Types,*/ Document} from 'mongoose';
import {InfoSchema, Info} from './info.schema';
import {LocationSchema, Location} from './location.schema';
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
//   theme: {
//     type: String,
//     enum: ThemeArr
//   },
//   created_at: Date,
//   updated_at: Date
// })

export type CafeDocument = Cafe & Document;

@Schema({collection: 'cafes'})
export class Cafe {
  @Prop()
  _id!: string;

  @Prop()
  name!: string;

  @Prop({type: InfoSchema})
  info!: Info;

  @Prop()
  contact!: string;

  @Prop({type: LocationSchema})
  location!: Location;

  @Prop()
  theme!: Theme[];

  @Prop()
  created_at!: Date;

  @Prop()
  updated_at!: Date;
}

export const CafeSchema = SchemaFactory.createForClass(Cafe);
