import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserGetResponse } from 'github-lens-types/dist/esm/responses/user';
import { UserService } from '../../application/services/UserService';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async get(@Request() req: { userId: string }): Promise<UserGetResponse> {
    const user = await this.userService.findUser(req.userId);
    return {
      uid: user.uid,
      name: user.name,
      email: user.email,
      githubLoginId: user.githubLoginId,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt.toString(),
      updatedAt: user.updatedAt.toString(),
    };
  }
}
