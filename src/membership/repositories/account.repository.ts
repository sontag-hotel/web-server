import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Account} from '../schemas/account.schema';
import type {AccountDocument} from '../schemas/account.schema';
import type {Model} from 'mongoose';

type FindOneByParams = {
  _id?: string;
  kakaoUid?: string;
};

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>
  ) {}

  async findOneBy(params: FindOneByParams) {
    const qb = this.accountModel.findOne({});

    if (params._id) {
      qb.where('_id').equals(params._id);
    }

    if (params.kakaoUid) {
      qb.where('kakaoUid').equals(params.kakaoUid);
    }

    return await qb.lean().exec();
  }
}
