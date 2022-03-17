import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleDto, RoleMenuDto } from '../../dto/role.dto';
import { BaseController } from '../../common/base.controller';
import { CommonDto } from '../../dto/common.dto';

@ApiTags('角色管理')
@Controller('role')
export class RoleController extends BaseController{
  constructor(
    private readonly roleService: RoleService
  ) {
    super(roleService)
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({summary: '新增角色'})
  async create(@Body() role: RoleDto, @Request() req): Promise<any> {
    return await this.roleService.create(role, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @ApiOperation({summary: '更新角色'})
  async update(@Body() role: RoleDto, @Request() req): Promise<any> {
    return await this.roleService.update(role, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('divideAuth')
  @ApiOperation({summary: '分配权限'})
  async divideAuth(@Body() param: RoleMenuDto): Promise<any> {
    return await this.roleService.divideAuth(param);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getDivideAuth')
  @ApiOperation({summary: '获取已分配的权限'})
  async getDivideAuth(@Query() id: CommonDto): Promise<any> {
    return await this.roleService.getDivideAuth(id);
  }
}
