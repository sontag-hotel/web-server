import {Module} from '@nestjs/common';
import {MembershipModule} from 'src/membership/membership.module';
import {CafeModule} from '../cafe/cafe.module';
import * as Resolvers from './resolvers';

@Module({
  imports: [MembershipModule, CafeModule],
  providers: [...Object.values(Resolvers)],
})
export class FrontendModule {}
