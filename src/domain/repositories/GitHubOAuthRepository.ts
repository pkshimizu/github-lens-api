export interface GitHubOAuthRepository {
  getAccessToken(code: string): Promise<string>;
}
