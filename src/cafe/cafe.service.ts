import {Injectable /*, Inject*/} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model /*, Types*/} from 'mongoose';
import {Cafe, CafeDocument} from './schemas/cafe.schema';
import {/*Thema,*/ ThemaType} from './constModel/const';
// import { Cafe } from './models/cafe.model'
// import {/*CreateArgs,*/ GetCafeArgs} from './constModel/interface';
// import { Cafe } from './constModel/interface'

@Injectable()
export class CafeService {
  //   constructor(
  //     @Inject('CAFE_MODEL')
  //     private cafeModel: Model<Cafe>
  //   ) {}
  constructor(
    @InjectModel(Cafe.name)
    private readonly cafeModel: Model<CafeDocument>
  ) {}

  // async create(Args: CreateArgs): Promise<Cafe> {
  //   const newCafe = await this.cafeModel.create(
  //     {
  //       name: Args.name ? Args.name : null,
  //       info: {
  //         address: Args.address ? Args.address : null,
  //         workTime: {
  //           day: Args.day ? Args.day : null,
  //           startTime: Args.startTime ? Args.startTime : null,
  //           endTime: Args.endTime ? Args.endTime : null,
  //         },
  //       },
  //       thema: Args.thema ? Args.thema : null,
  //     },
  //     {
  //       timestamps: true,
  //     }
  //   );
  //   return newCafe;
  // }

  async findList(thema: ThemaType): Promise<Cafe[]> {
    const cafeList = await this.cafeModel.findOne({name: 'cafe 1'});
    const targetList = await this.cafeModel.aggregate([
      {
        $match: {thema: {$in: [thema]}},
      },
    ]);
    console.log('params', thema);
    console.log('result', cafeList);
    console.log('result2', targetList);
    // if (!cafeList) throw new Error('nothing matched');
    return targetList;
  }

  async find(): Promise<Cafe[]> {
    return await this.cafeModel.find().exec();
  }
}
