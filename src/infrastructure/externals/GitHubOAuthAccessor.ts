import { Injectable } from '@nestjs/common';
import { GitHubOAuthRepository } from '../../domain/repositories/GitHubOAuthRepository';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import * as queryString from 'querystring';
import {GitHubUser} from "../../domain/models";
import {Octokit} from "octokit";
import { DateTime } from 'src/domain/values';

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

  async getUser(accessToken: string): Promise<GitHubUser> {
    const octokit = new Octokit({
      auth: accessToken
    })
    const response = await octokit.rest.users.getAuthenticated()
    const data = response.data
    return {
      login: data.login,
      avatar_url: data.avatar_url,
      name: data.name,
      email: data.email,
      created_at: DateTime.parse(data.created_at),
      updated_at: DateTime.parse(data.updated_at)
    }
  }
}
