import {UseGuards} from '@nestjs/common';
import {Context, Query, Resolver} from '@nestjs/graphql';
import {JwtAuthGuard} from 'src/common/auth/jwtAuth.guard';
import {MembershipService} from 'src/membership/membership.service';
import {Me} from '../graphql/me.model';

@Resolver(() => Me)
export class MeResolver {
  constructor(private readonly membershipService: MembershipService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => Me)
  async me(@Context() context: any) {
    // TODO : implement interceptor or middleware and remove any typing
    const token = context.req.get('Authorization');
    const {_id} = this.membershipService.decodeJWT(token);

    const me = this.membershipService.findAccount(_id);

    return me;
  }
}
