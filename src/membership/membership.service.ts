import {Injectable} from '@nestjs/common';
import {Token, Profile} from '../common/kakaoClient/type';
import {KakaoClient} from '../common/kakaoClient';
import {JwtService} from '@nestjs/jwt';
import {Account, AccountDocument} from './schemas/account.schema';
import {KakaoAuthFailedException, KakaoLoginFailedException} from './errors';
import {InjectModel} from '@nestjs/mongoose';
import type {Model, Schema as MongooseSchema} from 'mongoose';

@Injectable()
export class MembershipService {
  private kakaoClient: KakaoClient;

  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
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

    const foundAccount = await this.accountModel
      .findOne({
        kakaoUid: String(profile.id),
      })
      .lean()
      .exec();

    if (!foundAccount) {
      throw new KakaoLoginFailedException({
        accessToken: token.accessToken,
      });
    }
    return foundAccount._id;
  }

  async findAccount(accountId: MongooseSchema.Types.ObjectId) {
    console.log('serivce');
    console.log(await this.accountModel.findById(accountId).lean().exec());
    console.log('------------');
    return await this.accountModel.findById(accountId).lean().exec();
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
