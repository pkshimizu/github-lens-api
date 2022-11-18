import { Inject, Injectable } from '@nestjs/common';
import { GitHubOAuthRepository } from '../../domain/repositories/GitHubOAuthRepository';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/models';
import { JwtService } from '@nestjs/jwt';

type JwtPayload = {
  userId: number;
};

@Injectable()
export class SessionService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('GitHubOAuthRepository')
    private readonly gitHubOAuthRepository: GitHubOAuthRepository,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async signInWithGitHub(code: string): Promise<string> {
    const accessToken = await this.gitHubOAuthRepository.getAccessToken(code);
    const gitHubUser = await this.gitHubOAuthRepository.getUser(accessToken);
    const user = await this.userRepository.saveUser(gitHubUser);
    return await this.generateJwtToken(user);
  }

  private async generateJwtToken(user: User) {
    const payload: JwtPayload = { userId: user.id };
    return this.jwtService.sign(payload);
  }
}
