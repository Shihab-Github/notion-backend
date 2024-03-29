import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { UserSchema } from 'src/users/models/user.schema';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(
  //   @CurrentUser() user: UserSchema,
  //   @Res({ passthrough: true }) response: Response,
  // ) {
  //   console.log('login hoise mama: ', user)
  //   await this.authService.login(user, response);
  //   response.send(user);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(req.user, response)
    response.send(req.user)
  }
}
