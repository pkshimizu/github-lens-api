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
    return {
      id: user.id,
      uid: user.uid,
      name: user.name,
      email: user.email,
      githubLoginId: user.githubLoginId,
      avatarUrl: user.avatarUrl,
      createdAt: parseDateTime(user.createdAt),
      updatedAt: parseDateTime(user.updatedAt),
    };
  }
}
