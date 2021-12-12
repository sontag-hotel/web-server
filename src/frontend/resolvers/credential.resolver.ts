import {Resolver, Args, Mutation, ResolveField, Parent} from '@nestjs/graphql';
import {plainToClass} from 'class-transformer';
import {Public} from 'src/common/decorator/public.decorator';
import {LoginKakaoArgs} from '../args/login-kakao.args';
import {SignupArgs} from '../args/signup.args';
import {MembershipService} from '../../membership/membership.service';
import {Credential} from '../graphql/credential.model';
import {Me} from '../graphql/me.model';
import {UnexpectedAccountException} from '../../membership/errors';

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

    return me;
  }

  @Mutation(() => Credential)
  @Public()
  async signup(@Args() args: SignupArgs) {
    const newAccountId = await this.membershipService.signup(
      args.input,
      args.accessToken
    );
    const newAccount = await this.membershipService.findAccount(newAccountId);
    if (newAccount) {
      const accessToken = this.membershipService.generateJWT(newAccount);
      return plainToClass(Credential, {token: accessToken});
    } else {
      throw new UnexpectedAccountException();
    }
  }
}
