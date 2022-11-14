import { Injectable } from '@nestjs/common';
import { GitHubOAuthRepository } from '../../domain/repositories/GitHubOAuthRepository';

@Injectable()
export class GitHubOAuthAccessor implements GitHubOAuthRepository {
  getAccessToken(code: string): string {
    return '';
  }
}
