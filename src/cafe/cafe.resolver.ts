import {Resolver, Args, Query, Mutation} from '@nestjs/graphql';
import {Cafe} from './models/cafe.model';
import {CafeService} from './cafe.service';
import {CreateCafeArgs} from './args/create.cafe.args';
import {GetCafeArgs} from './args/get.cafe.args';

@Resolver(() => Cafe)
export class CafeResolver {
  constructor(private cafeService: CafeService) {}

  @Mutation(() => Cafe)
  async createCafe(@Args('args') args: CreateCafeArgs) {
    return this.cafeService.create(args);
  }

  @Query(() => Cafe, {name: 'cafe'})
  async getCafe(@Args() args: GetCafeArgs) {
    return this.cafeService.findOneById(args);
  }
}
