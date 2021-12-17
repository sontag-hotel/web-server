import {Field, ObjectType, registerEnumType} from '@nestjs/graphql';
import {Thema, Day} from '../constModel/const';

registerEnumType(Thema, {
  name: 'Thema',
});

registerEnumType(Day, {
  name: 'Day',
});

@ObjectType({description: 'cafe.info.workTime'})
class WorkTime {
  @Field(() => [Day])
  day!: Day[];

  @Field({nullable: true})
  startTime!: string;

  @Field({nullable: true})
  endTime!: string;
}

@ObjectType({description: 'cafe.info'})
class Info {
  @Field()
  address!: string;

  @Field()
  workTime!: WorkTime;
}

@ObjectType({description: 'cafe.location'})
class Location {
  @Field()
  x!: number;

  @Field()
  y!: number;
}

@ObjectType({description: 'cafe'})
export class Cafe {
  @Field({description: 'object id'})
  _id?: string;

  @Field()
  name!: string;

  @Field()
  info!: Info;

  @Field()
  contact!: string;

  @Field()
  location!: Location;

  @Field(() => [Thema])
  thema!: Thema[];

  @Field()
  created_at!: Date;

  @Field()
  updated_at!: Date;
}
