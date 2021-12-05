import {Module} from '@nestjs/common';
import {CafeResolver} from './cafe.resolver';

@Module({
  providers: [CafeResolver],
})
export class CafeModule {}
