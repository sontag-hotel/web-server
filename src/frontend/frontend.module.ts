import {Module} from '@nestjs/common';
import {MembershipModule} from 'src/membership/membership.module';
import * as Resolvers from './resolvers';

@Module({
  imports: [MembershipModule],
  providers: [...Object.values(Resolvers)],
})
export class FrontendModule {}
