import {Field, ObjectType, registerEnumType} from '@nestjs/graphql';
import {Theme, Day} from '../constModel/const';

registerEnumType(Theme, {
  name: 'Theme',
});

registerEnumType(Day, {
  name: 'Day',
});

@ObjectType({description: 'cafe.info.workTime'})
export class WorkTime {
  @Field(() => [Day])
  day!: Day[];

  @Field({nullable: true})
  startTime!: string;

  @Field({nullable: true})
  endTime!: string;
}

@ObjectType({description: 'cafe.info'})
export class Info {
  @Field()
  address!: string;

  @Field()
  workTime!: WorkTime;
}

@ObjectType({description: 'cafe.location'})
export class Location {
  @Field()
  x!: number;

  @Field()
  y!: number;
}

//실제 적용되는 가장 상위 카페 객체 모델
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

  @Field(() => [Theme])
  theme!: Theme[];

  @Field()
  created_at!: Date;

  @Field()
  updated_at!: Date;
}
