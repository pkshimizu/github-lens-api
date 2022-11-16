import { Inject, Injectable } from '@nestjs/common';
import { GitHubOAuthRepository } from '../../domain/repositories/GitHubOAuthRepository';

@Injectable()
export class SessionService {
  constructor(
    @Inject('GitHubOAuthRepository')
    private readonly gitHubOAuthRepository: GitHubOAuthRepository,
  ) {}

  async signInWithGitHub(code: string): Promise<string> {
    const accessToken = await this.gitHubOAuthRepository.getAccessToken(code);
    const gitHubUser = await this.gitHubOAuthRepository.getUser(accessToken)
    console.log(gitHubUser);
    // user情報を保存
    // セッションを作成
    return '';
  }
}
