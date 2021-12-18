import {Injectable /*, Inject*/} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model /*, Types*/} from 'mongoose';
import {Cafe, CafeDocument} from './schemas/cafe.schema';
import {/*Thema,*/ ThemeType} from './constModel/const';
import {CreateArgs /*, GetCafeArgs*/} from './constModel/interface';

@Injectable()
export class CafeService {
  constructor(
    @InjectModel(Cafe.name)
    private readonly cafeModel: Model<CafeDocument>
  ) {}

  /* ------  Test Method  ------ */

  //기본 get test query method
  async find(): Promise<Cafe[]> {
    return await this.cafeModel.find();
  }

  /* ------  Usage Method  ------ */

  //테마별 카페 조회
  async findList(theme: ThemeType): Promise<Cafe[]> {
    // const cafeList = await this.cafeModel.findOne({name: 'cafe1'});
    console.log('params', theme);
    console.log('col doc length', await this.cafeModel.count());
    const targetList = await this.cafeModel.aggregate([
      {
        $match: {theme: {$in: [theme]}},
      },
    ]);
    // console.log('result', cafeList);
    console.log('result2', targetList);
    // if (!cafeList) throw new Error('nothing matched');
    return targetList;
  }

  async create(Args: CreateArgs): Promise<Cafe> {
    const newCafe = await this.cafeModel.create({
      name: Args.name ? Args.name : null,
      info: {
        address: Args.address ? Args.address : null,
        workTime: {
          day: Args.day ? Args.day : null,
          startTime: Args.startTime ? Args.startTime : null,
          endTime: Args.endTime ? Args.endTime : null,
        },
      },
      contact: Args.contact ? Args.contact : null,
      location: {
        x: Args.locationX ? Args.locationX : null,
        y: Args.locationY ? Args.locationY : null,
      },
      theme: Args.theme ? Args.theme : null,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return newCafe;
  }
}
