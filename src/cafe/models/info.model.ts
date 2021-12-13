import {Field, ObjectType} from '@nestjs/graphql';
import {WorkTime} from './workTime.model';

@ObjectType({description: 'cafe'})
export class Info {
  @Field()
  address!: string;

  @Field()
  workTime!: WorkTime;
}
