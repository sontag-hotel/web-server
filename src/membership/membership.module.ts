import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {CommonModule} from 'src/common/common.module';
import {CredentialResolver} from './membership.resolver';
import {MembershipService} from './membership.service';
import {AccountRepository} from './repositories/account.repository';
import {User, UserSchema} from './schemas/user.schema';
import {Account, AccountSchema} from './schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name: Account.name, schema: AccountSchema},
    ]),
    CommonModule,
  ],
  providers: [CredentialResolver, MembershipService, AccountRepository],
})
export class MembershipModule {}
