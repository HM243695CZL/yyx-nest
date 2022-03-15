import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { MenuDto } from '../../dto/menu.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BaseController } from '../../common/base.controller';

@ApiTags('菜单管理')
@Controller('menu')
export class MenuController extends BaseController{
  constructor(private readonly menuService: MenuService) {
    super(menuService);
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
}
