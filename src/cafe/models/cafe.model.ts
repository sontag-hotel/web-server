import  { Field, ObjectType } from '@nestjs/graphql'
import { Thema } from '../constModel/const';
import { Types } from 'mongoose';
import { Info } from './info.model'

@ObjectType({description: 'cafe'})
export class Cafe {
    @Field({description: 'object id'})
    _id!: Types.ObjectId;

    @Field()
    name!: string;

    @Field()
    info!: Info
    // info!: {
        //     address: string;
        //     workTime: {
            //         day: Day[] | null;
            //         startTime: string | null;
            //         endTime: string | null
            //     }
        // }
            
    @Field(() => [Thema] || null)
    thema!: string[];

    @Field()
    created_at!: Date;

    @Field()
    updated_at!: Date;
}
