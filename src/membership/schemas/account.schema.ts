import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import type {Schema as MongooseSchema} from 'mongoose';

export type AccountDocument = Account & Document;

@Schema({
  collection: 'accounts',
})
export class Account {
  _id!: MongooseSchema.Types.ObjectId;

  @Prop({required: true})
  name!: string;

  @Prop({require: true})
  kakaoUid!: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
