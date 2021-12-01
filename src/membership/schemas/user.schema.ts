import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import type {Document} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({type: String, required: true, lowercase: true})
  _id!: string;

  @Prop()
  name!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
