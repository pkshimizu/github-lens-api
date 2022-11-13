import {Injectable} from "@nestjs/common";
import {GitHubOAuthRepository} from "../../domain/repositories/GitHubOAuthRepository";

@Injectable()
export class SessionService {
  constructor(private readonly gitHubOAuthRepository: GitHubOAuthRepository) {}
  signInWithGitHub(code: string): string {
    const accessToken = this.gitHubOAuthRepository.getAccessToken(code)
    return ""
  }
}