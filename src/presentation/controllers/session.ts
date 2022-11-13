import { Body, Controller, Post } from '@nestjs/common';
import { SessionPostRequest, SessionPostResponse } from 'github-lens-types';

@Controller()
export class SessionController {
  @Post()
  create(@Body() request: SessionPostRequest): SessionPostResponse {
    return {
      token: '',
    };
  }
}
