import { Inject, Injectable } from '@nestjs/common';
import { GitHubOAuthRepository } from '../../domain/repositories/GitHubOAuthRepository';
import { UserRepository } from '../../domain/repositories/UserRepository';

@Injectable()
export class SessionService {
  constructor(
    @Inject('GitHubOAuthRepository')
    private readonly gitHubOAuthRepository: GitHubOAuthRepository,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async signInWithGitHub(code: string): Promise<string> {
    const accessToken = await this.gitHubOAuthRepository.getAccessToken(code);
    const gitHubUser = await this.gitHubOAuthRepository.getUser(accessToken);
    await this.userRepository.saveUser(gitHubUser);
    // セッションを作成
    return '';
  }
}
