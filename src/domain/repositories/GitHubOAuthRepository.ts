export interface GitHubOAuthRepository {
  getAccessToken(code: string): string;
}
