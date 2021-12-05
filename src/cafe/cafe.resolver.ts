import {Query, Resolver} from '@nestjs/graphql';
import {plainToClass} from 'class-transformer';
import {Public} from 'src/common/decorator/public.decorator';
import {Cafe} from './graphql/cafe.model';

/* Root Query가 필요해서 작성함 */
@Resolver(() => Cafe)
export class CafeResolver {
  @Query(() => Cafe)
  @Public()
  async cafeList() {
    return ['cafe1', 'cafe2'].map(cafeName =>
      plainToClass(Cafe, {name: cafeName})
    );
  }
}
