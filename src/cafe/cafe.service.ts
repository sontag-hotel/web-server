import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Cafe, CafeDocument} from './schemas/cafe.schema';
import {CafeUser, CafeUserDocument} from './schemas/cafeUser.schema';
import {ThemeType} from './constModel/const';
import {CreateArgs} from './constModel/interface';
import {CafeCard} from './models/cafe.card.model';

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
  async findList(theme: ThemeType): Promise<CafeCard[]> {
    const targetList = await this.cafeModel.aggregate([
      {
        $match: {theme: {$in: [theme]}},
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
      theme: Args.theme ? [Args.theme] : [],
      created_at: new Date(),
      updated_at: new Date(),
    });

    const newCafeUser = await this.cafeUserModel.create({
      userId: new Types.ObjectId(newCafe._id), //나중에 유저 object id 또는 그냥 id값 받아서 입력
      cafeId: new Types.ObjectId(newCafe._id),
      theme: Args.theme,
      created_at: new Date(),
      updated_at: new Date(),
    });

    console.log('new cafe user data', newCafeUser);
    return newCafe;
  }
}
