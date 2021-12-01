import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '../schemas/user.schema';
import type {UserDocument} from '../schemas/user.schema';
import type {Model} from 'mongoose';

type FindOneByParams = {
  _id?: string;
};

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneBy(params: FindOneByParams) {
    return await this.userModel.findById({id: params._id}).lean().exec();
  }

  async findAllBy(params: any): Promise<User[]> {
    return await this.userModel.find().lean().exec();
  }
}
