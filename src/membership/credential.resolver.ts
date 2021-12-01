import {Query, Resolver, Args} from '@nestjs/graphql';
import {plainToClass} from 'class-transformer';
import {CredentialService} from './credential.service';
import {User, UserList} from './graphql/user';

@Resolver(() => User)
export class CredentialResolver {
  constructor(private readonly credentialService: CredentialService) {}

  @Query(() => User)
  async user(@Args('_id', {type: () => String}) _id: string) {
    const foundUser = this.credentialService.findUser(_id);

    return plainToClass(User, foundUser);
  }

  @Query(() => [User])
  async userList() {
    const userList = await this.credentialService.findUserList();

    return plainToClass(UserList, userList);
  }
}
