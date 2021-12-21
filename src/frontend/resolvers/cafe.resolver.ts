import {Resolver, Args, Query, Mutation, Context} from '@nestjs/graphql';
import {Cafe} from '../../cafe/models/cafe.model';
import {CafeCard} from '../../cafe/models/cafe.card.model';
import {CafeUser} from '../../cafe/models/cafe.user.model';
import {CafeService} from '../../cafe/cafe.service';
import {CreateCafeArgs} from '../../cafe/args/create.cafe.args';
import {GetCafeArgs} from '../../cafe/args/get.cafe.args';
import {GetCafeAroundArgs} from '../../cafe/args/get.cafe.around.args';
import {MembershipService} from 'src/membership/membership.service';
import {Types} from 'mongoose';

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

  //헤더 파싱 테스트 mutation
  @Mutation(() => String)
  async tokenCheck(
    @Context() context: any,
    @Args('args') args: string
  ): Promise<string> {
    const token = context.req.get('Authorization');
    const userData = await this.membershipService.decodeJWT(token);
    console.log('are u there? ', userData);
    console.log('this is args', args);

    return this.cafeService.tokenCheck();
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
  @Mutation(() => [CafeUser])
  async createCafe(
    @Args('args') args: CreateCafeArgs,
    @Context() context: any
  ): Promise<CafeUser[]> {
    const token = context.req.get('Authorization');
    const userData = await this.membershipService.decodeJWT(token);
    return await this.cafeService.create({
      ...args,
      userId: new Types.ObjectId(userData._id.toString()),
    });
  }
}
