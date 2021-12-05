import {Injectable} from '@nestjs/common';
import {Token, Profile} from '../common/kakaoClient/type';
import {KakaoClient} from '../common/kakaoClient';
import {AccountRepository} from './repositories/account.repository';
import {JwtService} from '@nestjs/jwt';
import {Account} from './schemas/account.schema';
import {KakaoAuthFailedException, KakaoLoginFailedException} from './errors';
@Injectable()
export class MembershipService {
  private kakaoClient: KakaoClient;

  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly jwtService: JwtService
  ) {
    this.kakaoClient = new KakaoClient();
  }

  async loginWithKakao(code: string, redirectURI: string) {
    let token: Token;
    let profile: Profile;

    try {
      token = await this.kakaoClient.exchangeToken(code, redirectURI);
      profile = await this.kakaoClient.fetchUserProfile(token.accessToken);
    } catch (error) {
      //카카오 인증 실패
      throw new KakaoAuthFailedException();
    }

    const account = await this.accountRepository.findOneBy({
      kakaoUid: String(profile.id),
    });

    if (!account) {
      throw new KakaoLoginFailedException({
        accessToken: token.accessToken,
      });
    }
    return account._id;
  }

  async findAccount(accountId: string) {
    return await this.accountRepository.findOneBy({_id: accountId});
  }

  public generateJWT(account: Account): string {
    const accessToken = this.jwtService.sign({
      name: account.name,
    });

    return accessToken;
  }

  public decodeJWT(accessToken: string): Account {
    const account = this.jwtService.decode(accessToken) as Account;
    return account;
  }
}
