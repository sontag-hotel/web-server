import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {
  Thema, 
  // ThemaType
} from '../constModel/const';
import {/*SchemaTypes, Types,*/ Document} from 'mongoose';

export type CafeUserDocument = CafeUser & Document;

@Schema({collection: 'cafe_users', versionKey: false})
export class CafeUser {
  @Prop()
  userId!: string;

  @Prop()
  cafeId!: string;

  @Prop({type: String})
  thema!: Thema

  @Prop()
  created_at!: Date;

  @Prop()
  updated_at!: Date;
}

export const CafeUserSchema = SchemaFactory.createForClass(CafeUser);
