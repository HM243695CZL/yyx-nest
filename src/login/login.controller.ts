import { Controller, Post, UseGuards, Request, Body, Req, Get } from '@nestjs/common';
import { ApiTags, ApiOperation} from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('登录管理')
@Controller('login')
export class LoginController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({summary: '登录'})
  @Post('')
  async login(@Request() req) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return 'profile'
  }

}

