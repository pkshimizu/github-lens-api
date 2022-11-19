import { GitHubUser, User } from '../models';

export interface UserRepository {
  saveUser(gitHubUser: GitHubUser): Promise<User>;
  findUserByUid(uid: string): Promise<User>;
}
