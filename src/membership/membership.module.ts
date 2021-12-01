import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {CredentialResolver} from './credential.resolver';
import {CredentialService} from './credential.service';
import {UserRepository} from './repositories/user.repository';
import {User, UserSchema} from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  providers: [CredentialResolver, CredentialService, UserRepository],
})
export class MembershipModule {}
