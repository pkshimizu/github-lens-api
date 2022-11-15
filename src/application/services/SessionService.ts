import { Inject, Injectable } from '@nestjs/common';
import { GitHubOAuthRepository } from '../../domain/repositories/GitHubOAuthRepository';

@Injectable()
export class SessionService {
  constructor(
    @Inject('GitHubOAuthRepository')
    private readonly gitHubOAuthRepository: GitHubOAuthRepository,
  ) {}

  signInWithGitHub(code: string): string {
    const accessToken = this.gitHubOAuthRepository.getAccessToken(code);
    return '';
  }
}
