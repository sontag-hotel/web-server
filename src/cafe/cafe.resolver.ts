import {Resolver, Args, Query, Mutation} from '@nestjs/graphql';
import {Cafe} from './models/cafe.model';
import {CafeService} from './cafe.service';
import {CreateCafeArgs} from './args/create.cafe.args';
import {GetCafeArgs} from './args/get.cafe.args';
import {CafeCard} from './models/cafe.card.model';

@Resolver(() => Cafe)
export class CafeResolver {
  constructor(private cafeService: CafeService) {}

  /* ------  Test Method  ------ */

  //기본 get test query method
  @Query(() => [Cafe])
  async getAllCafe(): Promise<Cafe[]> {
    return await this.cafeService.find();
  }

  /* ------  Usage Method  ------ */

  //테마별 카페 query method
  @Query(() => [Cafe], {name: Cafe.name, nullable: true})
  async getCafe(@Args() args: GetCafeArgs): Promise<CafeCard[]> {
    return await this.cafeService.findList(args.theme);
  }

  //카페 생성 mutation
  @Mutation(() => Cafe)
  async createCafe(@Args('args') args: CreateCafeArgs): Promise<Cafe> {
    return await this.cafeService.create(args);
  }
}
