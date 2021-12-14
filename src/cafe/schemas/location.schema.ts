import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class Location {
  @Prop()
  x!: number;

  @Prop()
  y!: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
