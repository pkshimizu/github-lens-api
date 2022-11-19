import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { GitHubUser, User } from '../../domain/models';
import { Repository } from 'typeorm';
import { UserEntity } from './entities';
import { parseDateTime } from '../../domain/values';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserAccessor implements UserRepository {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}
  async saveUser(gitHubUser: GitHubUser): Promise<User> {
    let user = await this.repository.findOneBy({
      githubLoginId: gitHubUser.login,
    });
    if (user) {
      await this.repository.save({
        ...user,
        name: gitHubUser.name,
        email: gitHubUser.email,
        avatar_url: gitHubUser.avatarUrl,
      });
    } else {
      user = new UserEntity();
      user.name = gitHubUser.name;
      user.email = gitHubUser.email;
      user.githubLoginId = gitHubUser.login;
      user.avatarUrl = gitHubUser.avatarUrl;
      await this.repository.save(user);
    }
    return this.toUser(user);
  }

  async findUserByUid(uid: string): Promise<User> {
    const user = await this.repository.findOneBy({ uid });
    return this.toUser(user);
  }

  private toUser(userEntity: UserEntity): User {
    return {
      id: userEntity.id,
      uid: userEntity.uid,
      name: userEntity.name,
      email: userEntity.email,
      githubLoginId: userEntity.githubLoginId,
      avatarUrl: userEntity.avatarUrl,
      createdAt: parseDateTime(userEntity.createdAt),
      updatedAt: parseDateTime(userEntity.updatedAt),
    };
  }
}
