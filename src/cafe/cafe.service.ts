import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cafe, CafeDocument } from './schemas/cafe.schema'
import { CreateArgs } from './constModel/interface'
// import { GetAuthorArgs } from './dto/get-author.args';
// import { Author, AuthorDocument } from './schemas/author.schema';
// import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class CafeService {
  constructor(
    @InjectModel(Cafe.name)
    private readonly cafeModel: Model<CafeDocument>
  ) {}

  async create(Args: CreateArgs): Promise<Cafe | null> {
    const newCafe = await this.cafeModel.create({
      name: Args.name ? Args.name : null,
      info: {
        address: Args.address ? Args.address : null,
        workTime: {
          day: Args.day ? Args.day : null,
          startTime: Args.startTime ? Args.startTime : null,
          endTime: Args.endTime ? Args.endTime : null
        }
      },
      thema: Args.thema ? Args.thema : null
    })
    return newCafe

  }
  // async findOneById(id: number): Promise<Cafe | null> {
  //   return await this.cafeModel.findOne({id:id})
  // }
}