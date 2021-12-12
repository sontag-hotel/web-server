import {Injectable} from '@nestjs/common';
import {UserRepository} from './repositories/user.repository';

@Injectable()
export class CredentialService {
  constructor(private readonly userRepository: UserRepository) {}

  /* POC service */
  async findUser(_id: string) {
    const user = await this.userRepository.findOneBy({_id});

    if (!user) {
      throw new Error();
    }

    return user;
  }
  async findUserList() {
    const userList = await this.userRepository.findAllBy({});

    return userList;
  }
  createUser() {}
  updateUser() {}
  deleteUser() {}
}
