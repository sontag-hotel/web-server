import {Resolver,Args,/*Query,*/ Mutation} from '@nestjs/graphql';
import { Cafe } from './models/cafe.model'
import { CafeService } from './cafe.service'
import { CreateCafeArgs } from './args/create.cafe.args'

  
  @Resolver(() => Cafe)
  export class CafeResolver {
    constructor(private cafeService: CafeService) {}

    @Mutation(() => Cafe)
    async createCafe(@Args('args') args: CreateCafeArgs) {
      return this.cafeService.create(args)
    }
  
    // @Query(() => Cafe, { name: 'cafe' })
    // async getDog() {
    //   return this.cafeService.findOneById();
    // }
  }
  