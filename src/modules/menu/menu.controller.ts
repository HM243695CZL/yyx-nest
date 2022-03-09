import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { PageEntity } from '../../entity/page.entity';
import { MenuDto } from '../../dto/menu.dto';
import { CommonDto } from '../../dto/common.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('菜单管理')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('list')
  @ApiOperation({summary: '获取所有菜单'})
  async list() {
    return await this.menuService.list();
  }

  @Post('page')
  @ApiOperation({summary: '分页'})
  async page(@Body() page: PageEntity): Promise<any> {
    return await this.menuService.page(page);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({summary: '新增菜单'})
  async create(@Body() menu: MenuDto): Promise<any>{
    return await this.menuService.create(menu);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @ApiOperation({summary: '更新菜单'})
  async update(@Body() menu: MenuDto): Promise<any> {
    return await this.menuService.update(menu);
  }

  @Get('view')
  @ApiOperation({summary: '查看菜单'})
  async view(@Query() id: CommonDto): Promise<any> {
    return await this.menuService.view(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('delete')
  @ApiOperation({summary: '删除菜单'})
  async delete(@Query() id: CommonDto): Promise<any> {
    return await this.menuService.delete(id);
  }
}
