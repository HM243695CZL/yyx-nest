import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from '../../dto/user.dto';
import { CommonDto } from '../../dto/common.dto';
import { PageEntity } from '../../entity/page.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Get('list')
  @ApiOperation({ summary: '获取所有用户' })
  async list() {
    return await this.userService.list();
  }

  @Post('page')
  @ApiOperation({summary: '分页'})
  async page(@Body() page: PageEntity): Promise<any> {
    return await this.userService.page(page);
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

  @Get('view')
  @ApiOperation({ summary: '查看用户'})
  async view(@Query() id: CommonDto ): Promise<any> {
    return await this.userService.view(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('delete')
  @ApiOperation({ summary: '删除用户'})
  async delete(@Query() id: CommonDto): Promise<any> {
    return await this.userService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('changeStatus')
  @ApiOperation({summary: '改变用户状态'})
  async changeStatus(@Body() {id}: CommonDto): Promise<any> {
    return await this.userService.changeStatus(id)
  }
}
