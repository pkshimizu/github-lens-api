import { GitHubUser } from '../models';

export interface GitHubOAuthRepository {
  getAccessToken(code: string): Promise<string>;
  getUser(accessToken: string): Promise<GitHubUser>;
}
