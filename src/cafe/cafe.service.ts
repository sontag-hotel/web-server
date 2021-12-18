import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Cafe, CafeDocument} from './schemas/cafe.schema';
import {CafeUser, CafeUserDocument} from './schemas/cafeUser.schema';
import {/*Thema,*/ ThemaType} from './constModel/const';
import {CreateArgs /*, GetCafeArgs*/} from './constModel/interface';

@Injectable()
export class CafeService {
  constructor(
    @InjectModel(Cafe.name)
    private readonly cafeModel: Model<CafeDocument>,

    @InjectModel(CafeUser.name)
    private readonly cafeUserModel: Model<CafeUserDocument>
  ) {}

  /* ------  Test Method  ------ */

  //기본 get test query method
  async find(): Promise<Cafe[]> {
    return await this.cafeModel.find();
  }

  /* ------  Usage Method  ------ */

  //테마별 카페 조회
  async findList(thema: ThemaType): Promise<Cafe[]> {
    // const cafeList = await this.cafeModel.findOne({name: 'cafe1'});
    console.log('params', thema);
    console.log('col doc length', await this.cafeModel.count());
    const targetList = await this.cafeModel.aggregate([
      {
        $match: {thema: {$in: [thema]}},
      },
    ]);
    // console.log('result', cafeList);
    console.log('result2', targetList);
    // if (!cafeList) throw new Error('nothing matched');
    return targetList;
  }

  //범위 내 카페 조회
  async findRange({left, right, up, down}): Promise<Cafe[]> {
    const targetList = await this.cafeModel.aggregate([
      {
        $match: {},
      },
    ]);
    return targetList;
  }

  //카페 등록
  async create(Args: CreateArgs): Promise<Cafe> {
    const newCafe = await this.cafeModel.create({
      name: Args.name ? Args.name : null,
      info: {
        address: Args.address ? Args.address : null,
        workTime: {
          day: Args.day ? Args.day : [],
          startTime: Args.startTime ? Args.startTime : null,
          endTime: Args.endTime ? Args.endTime : null,
        },
      },
      contact: Args.contact ? Args.contact : null,
      location: {
        x: Args.locationX ? Args.locationX : null,
        y: Args.locationY ? Args.locationY : null,
      },
      thema: Args.thema ? [Args.thema] : [],
      created_at: new Date(),
      updated_at: new Date(),
    });

    const newCafeUser = await this.cafeUserModel.create({
      userId: newCafe._id, //나중에 유저 object id 또는 그냥 id값 받아서 입력
      cafeId: newCafe._id,
      thema: Args.thema,
      created_at: new Date(),
      updated_at: new Date(),
    });

    console.log('new cafe user data', newCafeUser);
    return newCafe;
  }
}
