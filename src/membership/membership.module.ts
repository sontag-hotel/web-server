import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {CommonModule} from 'src/common/common.module';
import {MembershipService} from './membership.service';
import {Account, AccountSchema} from './schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Account.name, schema: AccountSchema}]),
    CommonModule,
  ],
  providers: [MembershipService],
  exports: [MembershipService],
})
export class MembershipModule {}
