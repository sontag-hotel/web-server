import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Cafe, CafeDocument} from './schemas/cafe.schema';
import {CafeUser, CafeUserDocument} from './schemas/cafeUser.schema';
import {Theme, ThemeType} from './constModel/const';
import {CreateArgs} from './constModel/interface';
import {CafeCard} from './models/cafe.card.model';
import {GetCafeAroundArgs} from './args/get.cafe.around.args';
import {DuplicateCafeUserThemeError} from './error/cafe';
// import {ExpiredTokenException} from '../cafe/error/token';

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

  //헤더 파싱 테스트 mutation method
  //만료 토큰 에러처리
  tokenCheck(userData: any): string {
    console.log('userData check', userData);

    //현재는 만료된 토큰에 대해서도 접속할 수 있도록 풀어두었음
    // if (userData.exp * 1000 < new Date().getTime()) {
    //   throw new ExpiredTokenException();
    // }
    return 'You have validate token';
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
          kakaoPlaceId: 1,
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
            kakaoPlaceId: 1,
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
            kakaoPlaceId: 1,
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
  async create(Args: CreateArgs): Promise<CafeUser[]> {
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

    //다른 형태의 리턴값 처리 필요

    //테마 이미 3개 등록됐는지 확인
    const cafeThemeList = await this.cafeUserModel.count({
      userId: Args.userId,
      theme: Args.theme as Theme,
    });

    console.log('theme list count', cafeThemeList);

    //테마가 3개 이상이면
    if (cafeThemeList >= 3) {
      const originThemeCafeList = await this.cafeUserModel.find({
        userId: Args.userId,
        theme: Args.theme as Theme,
      });

      console.log('real over 3 theme list', originThemeCafeList);
      //3개의 리스트 반환
      return originThemeCafeList;
    } else {
      //3개 미만일 때
      const existCheck = await this.cafeModel.findOne({
        kakaoPlaceId: Args.kakaoPlaceId,
      });

      console.log('exist check : ', existCheck);
      //이미 등록하려는 카페가 있는 경우
      if (existCheck) {
        //이미 해당 카페에 해당 테마 등록했는지 확인
        const existCafeUserThemeCheck = await this.cafeUserModel.findOne({
          cafeId: existCheck._id,
          userId: Args.userId,
          theme: Args.theme as Theme,
        });

        //중복 데이터 케이스 에러 리턴
        if (existCafeUserThemeCheck) {
          throw new DuplicateCafeUserThemeError();
        }

        //등록하고 싶은 테마도 있는경우
        if (existCheck.theme.indexOf(Args.theme as Theme) !== -1) {
          const newCafeUser = await this.cafeUserModel.create({
            userId: Args.userId,
            cafeId: existCheck._id,
            theme: Args.theme,
            created_at: new Date(),
            updated_at: new Date(),
          });

          console.log('new cafe user data', newCafeUser);

          //본인도 이 카페에 테마 등록했다는 데이터 리턴
          return [newCafeUser];
        } else {
          //카페는 이미 있는데 테마가 없는 경우
          const updateTargetCafe = await this.cafeModel.findOneAndUpdate(
            {
              kakaoPlaceId: Args.kakaoPlaceId,
            },
            {
              $push: {theme: Args.theme},
            },
            {returnOriginal: false}
          );

          console.log('theme change check', updateTargetCafe);

          const newCafeUser = await this.cafeUserModel.create({
            userId: Args.userId,
            cafeId: existCheck._id,
            theme: Args.theme,
            created_at: new Date(),
            updated_at: new Date(),
          });

          return [newCafeUser];
        }
      } else {
        //카페 자체가 등록이 안돼있는 경우
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
          kakaoPlaceId: Args.kakaoPlaceId ? Args.kakaoPlaceId : null,
          created_at: new Date(),
          updated_at: new Date(),
        });

        console.log('new cafe check', newCafe);

        const newCafeUser = await this.cafeUserModel.create({
          userId: Args.userId,
          cafeId: new Types.ObjectId(newCafe._id),
          theme: Args.theme,
          created_at: new Date(),
          updated_at: new Date(),
        });

        console.log('new cafe user data', newCafeUser);
        return [newCafeUser];
      }
    }
  }
}
