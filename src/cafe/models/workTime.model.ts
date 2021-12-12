import  { Field, ObjectType } from '@nestjs/graphql'
import { Day } from '../constModel/const';


@ObjectType({description: 'cafe'})
export class WorkTime {
    @Field( () => [Day] || null )
    day!: string[] | null;

    @Field({nullable: true})
    startTime!: string;

    @Field({nullable: true})
    endTime!: string;

}

 //     workTime: {
            //         day: Day[] | null;
            //         startTime: string | null;
            //         endTime: string | null
            //     }