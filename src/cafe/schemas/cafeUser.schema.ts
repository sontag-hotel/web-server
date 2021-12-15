import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Thema} from '../constModel/const';
import {/*SchemaTypes, Types,*/ Document} from 'mongoose';

export type CafeUserDocument = CafeUser & Document;

@Schema({collection: 'cafes'})
export class CafeUser {
  @Prop()
  _id!: string;

  @Prop()
  userId!: string;

  @Prop()
  cafeId!: string;

  @Prop()
  thema!: Thema;

  @Prop()
  created_at!: Date;

  @Prop()
  updated_at!: Date;
}

export const CafeUserSchema = SchemaFactory.createForClass(CafeUser);
