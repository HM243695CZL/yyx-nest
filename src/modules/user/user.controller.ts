import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { EditPassDto, UserDto } from '../../dto/user.dto';
import { CommonDto } from '../../dto/common.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BaseController } from '../../common/base.controller';
import { Transaction, EntityManager, TransactionManager } from 'typeorm';

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
  @Transaction()
  async create(@Body() user: UserDto, @TransactionManager() manager: EntityManager): Promise<any>{
    return await this.userService.create(user, manager);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @ApiOperation({ summary: '更新用户'})
  @Transaction()
  async update(@Body() user: UserDto, @TransactionManager() manager: EntityManager): Promise<any> {
    return await this.userService.update(user, manager);
  }


  @UseGuards(JwtAuthGuard)
  @Post('changeStatus')
  @ApiOperation({summary: '改变用户状态'})
  async changeStatus(@Body() {id}: CommonDto): Promise<any> {
    return await this.userService.changeStatus(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('changePass')
  @ApiOperation({summary: '修改密码'})
  async changePassword(@Body() param: EditPassDto): Promise<any> {
    return await this.userService.changePass(param);
  }
}
