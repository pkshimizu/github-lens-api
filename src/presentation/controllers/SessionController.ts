import { Body, Controller, Post } from '@nestjs/common';
import { SessionPostRequest, SessionPostResponse } from 'github-lens-types';
import { SessionService } from '../../application/services/SessionService';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create(
    @Body() request: SessionPostRequest,
  ): Promise<SessionPostResponse> {
    await this.sessionService.signInWithGitHub(request.code);
    return {
      token: '',
    };
  }
}
