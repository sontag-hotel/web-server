import {Resolver, Args, Mutation, ResolveField, Parent} from '@nestjs/graphql';
import {plainToClass} from 'class-transformer';
import {Public} from 'src/common/decorator/public.decorator';
import {LoginKakaoArgs} from './args/login-kakao.args';
import {MembershipService} from './membership.service';
import {Credential} from './graphql/credential.model';
import {Me} from './graphql/me.model';
import {UnexpectedAccountException} from './errors';

@Resolver(() => Credential)
export class CredentialResolver {
  constructor(private readonly membershipService: MembershipService) {}

  @Mutation(() => Credential)
  @Public()
  async loginKakao(@Args() args: LoginKakaoArgs) {
    const accountId = await this.membershipService.loginWithKakao(
      args.code,
      args.redirectURI
    );
    const account = await this.membershipService.findAccount(accountId);

    if (account) {
      const accessToken = this.membershipService.generateJWT(account);
      return plainToClass(Credential, {token: accessToken});
    } else {
      throw new UnexpectedAccountException();
    }
  }

  @ResolveField(() => Me)
  async me(@Parent() credential: Credential) {
    const {token} = credential;
    const {_id} = this.membershipService.decodeJWT(token);
    const me = this.membershipService.findAccount(_id);

    return plainToClass(Me, me);
  }
}
