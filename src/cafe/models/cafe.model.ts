import {Field, ObjectType, registerEnumType} from '@nestjs/graphql';
// import {IsEnum} from 'class-validator';
import {Thema} from '../constModel/const';
import {Info} from './info.model';

registerEnumType(Thema, {
  name: 'Thema',
});

@ObjectType({description: 'cafe'})
export class Cafe {
  @Field(() => String, {description: 'object id'})
  _id!: string;

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
