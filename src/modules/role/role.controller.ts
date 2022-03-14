import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { PageEntity } from '../../entity/page.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleDto } from '../../dto/role.dto';
import { CommonDto } from '../../dto/common.dto';

@ApiTags('角色管理')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService
  ) {}

  @Get('list')
  @ApiOperation({summary: '获取所有角色'})
  async list() {
    return await this.roleService.list();
  }

  @Post('page')
  @ApiOperation({summary: '分页'})
  async page(@Body() page: PageEntity): Promise<any> {
    return await this.roleService.page(page);
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

  @Get('view')
  @ApiOperation({summary: '查看角色'})
  async view(@Query() id: CommonDto): Promise<any> {
    return await this.roleService.view(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('delete')
  @ApiOperation({summary: '删除角色'})
  async delete(@Query() id: CommonDto): Promise<any> {
    return await this.roleService.delete(id);
  }
}
