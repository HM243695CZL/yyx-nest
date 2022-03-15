import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from '../../dto/user.dto';
import { CommonDto } from '../../dto/common.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BaseController } from '../../common/base.controller';

@ApiTags('用户管理')
@Controller('user')
export class UserController extends BaseController{
  constructor(
    private readonly userService: UserService
  ){
    super(userService);
  }


  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({summary: '新增用户'})
  async create(@Body() user: UserDto): Promise<any>{
    return await this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @ApiOperation({ summary: '更新用户'})
  async update(@Body() user: UserDto): Promise<any> {
    return await this.userService.update(user);
  }


  @UseGuards(JwtAuthGuard)
  @Post('changeStatus')
  @ApiOperation({summary: '改变用户状态'})
  async changeStatus(@Body() {id}: CommonDto): Promise<any> {
    return await this.userService.changeStatus(id)
  }
}
