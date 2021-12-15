import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Thema} from '../constModel/const';
import {/*SchemaTypes, Types,*/ Document} from 'mongoose';
import {InfoSchema, Info} from './info.schema';
import {LocationSchema, Location} from './location.schema';

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
  thema!: Thema[];

  @Prop()
  created_at!: Date;

  @Prop()
  updated_at!: Date;
}

export const CafeSchema = SchemaFactory.createForClass(Cafe);
