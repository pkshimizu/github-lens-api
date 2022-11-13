import { Body, Controller, Post } from '@nestjs/common';
import { SessionPostRequest, SessionPostResponse } from 'github-lens-types';
import {SessionService} from "../../application/services/session";

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}
  @Post()
  create(@Body() request: SessionPostRequest): SessionPostResponse {
    this.sessionService.signInWithGitHub(request.code)
    return {
      token: '',
    };
  }
}
