import { Injectable } from '@nestjs/common';
import { GitHubOAuthRepository } from '../../domain/repositories/GitHubOAuthRepository';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import * as queryString from 'querystring';

@Injectable()
export class GitHubOAuthAccessor implements GitHubOAuthRepository {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async getAccessToken(code: string): Promise<string> {
    const response = await firstValueFrom(
      this.http.post('https://github.com/login/oauth/access_token', {
        client_id: this.config.get<string>('GITHUB_OAUTH_CLIENT_ID'),
        client_secret: this.config.get<string>('GITHUB_OAUTH_CLIENT_SECRET'),
        code,
      }),
    );
    const query = queryString.parse(response.data) as { access_token: string };
    return query.access_token;
  }
}
