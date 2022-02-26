import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from '../dto/user.dto';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Get('list')
  @ApiOperation({ summary: '获取用户列表' })
  async list() {
    return await this.userService.list();
  }

  @Post('create')
  @ApiOperation({summary: '新增用户'})
  async create(@Body() user: UserDto): Promise<any>{
    return await this.userService.create(user);
  }
}
