import {Resolver, Args, Query, Mutation, Context} from '@nestjs/graphql';
import {Cafe} from '../../cafe/models/cafe.model';
import {CafeCard} from '../../cafe/models/cafe.card.model';
// import {CafeUser} from '../../cafe/models/cafe.user.model';
import {CafeService} from '../../cafe/cafe.service';
import {CreateCafeArgs} from '../../cafe/args/create.cafe.args';
import {GetCafeArgs} from '../../cafe/args/get.cafe.args';
import {GetCafeAroundArgs} from '../../cafe/args/get.cafe.around.args';
import {MembershipService} from 'src/membership/membership.service';
import {Types} from 'mongoose';
import {NullTokenException} from '../../cafe/error/token';
import {WrongTokenException} from '../../cafe/error/token';
import {ParamsError} from '../../cafe/error/cafe';
import {NormalizedResponse} from '../../cafe/models/return.model';

@Resolver(() => Cafe)
export class CafeResolver {
  constructor(
    private cafeService: CafeService,
    private membershipService: MembershipService
  ) {}

  /* ------  Test Method  ------ */

  //기본 get test query method
  @Query(() => [Cafe])
  async getAllCafe(): Promise<Cafe[]> {
    return await this.cafeService.find();
  }

  //토큰 검증 mutation
  @Mutation(() => String)
  async tokenCheck(@Context() context: any): Promise<string> {
    const token = context.req.get('Authorization');
    if (!token) {
      throw new NullTokenException();
    }
    const userData = await this.membershipService.decodeJWT(token);
    console.log('are u there? ', userData);
    if (!userData) {
      throw new WrongTokenException();
    }
    return this.cafeService.tokenCheck(userData);
  }

  /* ------  Usage Method  ------ */

  //테마별 카페 query method
  @Query(() => [CafeCard], {nullable: true})
  async getCafe(@Args() args: GetCafeArgs): Promise<CafeCard[]> {
    return await this.cafeService.findList(args.theme);
  }

  //1km 이내 카페 조회
  @Query(() => [CafeCard], {nullable: true})
  async getCafeAround(@Args() args: GetCafeAroundArgs): Promise<CafeCard[]> {
    return await this.cafeService.findAround(args);
  }

  //카페 생성 mutation
  // @Mutation(() => [CafeUser])
  // async createCafe(
  //   @Args('args') args: CreateCafeArgs,
  //   @Context() context: any
  // ): Promise<CafeUser[]> {
  //   const token = context.req.get('Authorization');
  //   const userData = await this.membershipService.decodeJWT(token);
  //   console.log('user data check', userData);

  //   //입력값 에러 처리
  //   if (!args.name) {
  //     throw new ParamsError('name');
  //   }
  //   if (!args.address) {
  //     throw new ParamsError('address');
  //   }
  //   if (!args.contact) {
  //     throw new ParamsError('contact');
  //   }
  //   if (!args.locationX) {
  //     throw new ParamsError('locationX');
  //   }
  //   if (!args.locationY) {
  //     throw new ParamsError('locationY');
  //   }
  //   if (!args.kakaoPlaceId) {
  //     throw new ParamsError('kakaoPlaceId');
  //   }
  //   if (!args.theme) {
  //     throw new ParamsError('theme');
  //   }

  //   //실제 리턴값 처리
  //   return await this.cafeService.create({
  //     ...args,
  //     userId: new Types.ObjectId(userData._id.toString()),
  //   });
  // }

  @Mutation(() => NormalizedResponse)
  async createCafe(
    @Args('args') args: CreateCafeArgs,
    @Context() context: any
  ): Promise<NormalizedResponse> {
    const token = context.req.get('Authorization');
    const userData = await this.membershipService.decodeJWT(token);
    console.log('user data check', userData);

    //입력값 에러 처리
    if (!args.name) {
      throw new ParamsError('name');
    }
    if (!args.address) {
      throw new ParamsError('address');
    }
    if (!args.contact) {
      throw new ParamsError('contact');
    }
    if (!args.locationX) {
      throw new ParamsError('locationX');
    }
    if (!args.locationY) {
      throw new ParamsError('locationY');
    }
    if (!args.kakaoPlaceId) {
      throw new ParamsError('kakaoPlaceId');
    }
    if (!args.theme) {
      throw new ParamsError('theme');
    }

    const data = await this.cafeService.create({
      ...args,
      userId: new Types.ObjectId(userData._id.toString()),
    });
    return {
      data: data,
      message: 'ok',
      code: 200,
    };
  }
}
