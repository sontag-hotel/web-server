import {UseGuards} from '@nestjs/common';
import {Args, Context, Mutation, Query, Resolver} from '@nestjs/graphql';
import {JwtAuthGuard} from 'src/common/auth/jwtAuth.guard';
import {MembershipService} from 'src/membership/membership.service';
import {UpdateProfileArgs} from '../args/update-profile.args';
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

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Me)
  async updateProfile(
    @Args() args: UpdateProfileArgs,
    @Context() context: any
  ) {
    // TODO : implement interceptor or middleware and remove any typing
    const token = context.req.get('Authorization');
    const {_id} = this.membershipService.decodeJWT(token);

    const me = this.membershipService.updateProfile(_id, args.input);

    return me;
  }
}
