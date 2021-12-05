import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export type AccountDocument = Account & Document;

@Schema({
  collection: 'accounts',
})
export class Account {
  _id!: string;

  @Prop({required: true})
  name!: string;

  @Prop({require: true})
  kakaoUid!: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
