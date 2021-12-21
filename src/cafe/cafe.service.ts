import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Cafe, CafeDocument} from './schemas/cafe.schema';
import {CafeUser, CafeUserDocument} from './schemas/cafeUser.schema';
import {ThemeType} from './constModel/const';
import {CreateArgs} from './constModel/interface';
import {CafeCard} from './models/cafe.card.model';
import {GetCafeAroundArgs} from './args/get.cafe.around.args';

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
      {
        $lookup: {
          from: 'cafe_users',
          localField: '_id',
          foreignField: 'cafeId',
          as: 'result',
        },
      },
      {
        $project: {
          name: 1,
          info: 1,
          theme: 1,
          contact: 1,
          location: 1,
          cafeUserList: {
            userList: '$result',
            count: {$size: '$result'},
          },
          created_at: 1,
          updated_at: 1,
        },
      },
    ]);
    return targetList;
  }

  async findAround(args: GetCafeAroundArgs): Promise<CafeCard[]> {
    let targetList;
    if (!args.theme) {
      targetList = await this.cafeModel.aggregate([
        {
          $match: {
            'location.x': {
              $gte: args.locationX - 0.00988,
              $lte: args.locationX + 0.00988,
            },
            'location.y': {
              $gte: args.locationY - 0.00988,
              $lte: args.locationY + 0.00988,
            },
          },
        },
        {
          $lookup: {
            from: 'cafe_users',
            localField: '_id',
            foreignField: 'cafeId',
            as: 'result',
          },
        },
        {
          $project: {
            name: 1,
            info: 1,
            theme: 1,
            contact: 1,
            location: 1,
            cafeUserList: {
              userList: '$result',
              count: {$size: '$result'},
            },
            created_at: 1,
            updated_at: 1,
          },
        },
      ]);
    } else {
      targetList = await this.cafeModel.aggregate([
        {
          $match: {
            theme: {$in: [args.theme]},
            'location.x': {
              $gte: args.locationX - 0.00988,
              $lte: args.locationX + 0.00988,
            },
            'location.y': {
              $gte: args.locationY - 0.00988,
              $lte: args.locationY + 0.00988,
            },
          },
        },
        {
          $lookup: {
            from: 'cafe_users',
            localField: '_id',
            foreignField: 'cafeId',
            as: 'result',
          },
        },
        {
          $project: {
            name: 1,
            info: 1,
            theme: 1,
            contact: 1,
            location: 1,
            cafeUserList: {
              userList: '$result',
              count: {$size: '$result'},
            },
            created_at: 1,
            updated_at: 1,
          },
        },
      ]);
    }
    return targetList;
  }

  //카페 등록
  async create(Args: CreateArgs): Promise<Cafe> {
    //해당 유저가 이미 3개의 카페를 입력한 테마에 등록했는지 확인
    //userId-theme통해 3개 이상이면? 카페 리스트 3개 주기 아니면 go
    //const themeCafeList =  await cafeUserModel.find({
    // userId: header.payload.userId
    // theme: Args.theme
    // })
    //3개 이상일때 리턴(이후 테마 수정하는 api 하나 더 필요)
    // if(themeCafeList.length >= 3) {
    //  return themeCafeList
    // }
    //아니면 go case(찐 등록)
    // else {
    //카페가 이미 있는곳인지 아니면 내가 처음 등록하는지 확인 필요
    //이미 있으면 테마에 내가 등록하려는 테마가 존재하는지 확인
    //이미 테마에도 들어가 있으면 해당 doc objID 가져와서 cafe_users에 새로운것만 생성
    //테마에 없으면 하나 push 해주고 cafe_users에 생성
    //애초에 없는 카페였으면 생성해주고 cafe_user에 생성
    // }

    const newCafe = await this.cafeModel.create(
      // {
      //   name: Args.name,
      //   info: {
      //     address: Args.address,
      //   },
      //   location: {
      //     x: Args.locationX,
      //     y: Args.locationY,
      //   },
      // },
      {
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
      }
    );

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
