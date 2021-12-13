import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Cafe, CafeDocument} from './schemas/cafe.schema';
import {CreateArgs, GetCafeArgs} from './constModel/interface';

@Injectable()
export class CafeService {
  constructor(
    @InjectModel(Cafe.name)
    private readonly cafeModel: Model<CafeDocument>
  ) {}

  async create(Args: CreateArgs): Promise<Cafe> {
    const newCafe = await this.cafeModel.create(
      {
        name: Args.name ? Args.name : null,
        info: {
          address: Args.address ? Args.address : null,
          workTime: {
            day: Args.day ? Args.day : null,
            startTime: Args.startTime ? Args.startTime : null,
            endTime: Args.endTime ? Args.endTime : null,
          },
        },
        thema: Args.thema ? Args.thema : null,
      },
      {
        timestamps: true,
      }
    );
    return newCafe;
  }

  async findOneById(args: GetCafeArgs): Promise<Cafe | null> {
    return await this.cafeModel.findOne({_id: new Types.ObjectId(args._id)});
  }
}
