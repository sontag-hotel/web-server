import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Cafe, CafeSchema} from './schemas/cafe.schema';
import {CafeUser, CafeUserSchema} from './schemas/cafeUser.schema';
import {CafeService} from './cafe.service';
// import {CafeResolver} from '../frontend/resolvers/cafe.resolver';

//카페 메인 모듈
@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Cafe.name, schema: CafeSchema},
      {name: CafeUser.name, schema: CafeUserSchema},
    ]),
  ],
  providers: [CafeService],
  exports: [CafeService],
})
export class CafeModule {}
