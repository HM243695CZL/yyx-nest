import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Get()
  @ApiOperation({ summary: '用户列表' })
  async list() {
    return await this.userService.list();
  }
}
