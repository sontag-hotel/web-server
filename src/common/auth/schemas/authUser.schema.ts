import {Schema, SchemaFactory} from '@nestjs/mongoose';

export type AuthUserDocument = AuthUser & Document;

@Schema({
  collection: 'accounts',
})
export class AuthUser {
  _id!: string;
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);
