import { Controller, Post, Res, UseGuards } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

import { CurrentUser } from '@app/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from './users/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: any,
  ) {
    await this.authService.login(user, response);

    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
