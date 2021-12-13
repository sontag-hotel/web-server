import {Field, ID, ObjectType, registerEnumType} from '@nestjs/graphql';
// import {IsEnum} from 'class-validator';
import {Thema} from '../constModel/const';
import {Info} from './info.model';
// import { Types, SchemaTypes } from 'mongoose'

registerEnumType(Thema, {
  name: 'Thema',
});

@ObjectType({description: 'cafe'})
export class Cafe {
  @Field(()=> ID, {description: 'object id'})
  _id!: string;
    // _id!: Types.ObjectId

  @Field()
  name!: string;

  @Field()
  info!: Info;
  // info!: {
  //     address: string;
  //     workTime: {
  //         day: Day[] | null;
  //         startTime: string | null;
  //         endTime: string | null
  //     }
  // }

  @Field(() => [Thema])
  thema!: Thema[];

  @Field()
  created_at!: Date;

  @Field()
  updated_at!: Date;
}
