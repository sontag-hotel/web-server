import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Cafe, CafeSchema} from './schemas/cafe.schema';
import {CafeUser, CafeUserSchema} from './schemas/cafeUser.schema';
import {CafeService} from './cafe.service';
import {CafeResolver} from './cafe.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Cafe.name, schema: CafeSchema},
      {name: CafeUser.name, schema: CafeUserSchema},
    ]),
  ],
  providers: [CafeResolver, CafeService],
})
export class CafeModule {}
