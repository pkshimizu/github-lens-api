import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/models';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async findUser(uid: string): Promise<User> {
    return await this.userRepository.findUserByUid(uid);
  }
}
