import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { PageEntity } from '../../entity/page.entity';
import { MenuDto } from '../../dto/menu.dto';

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

  @Post('create')
  @ApiOperation({summary: '新增菜单'})
  async create(@Body() menu: MenuDto): Promise<any>{
    return await this.menuService.create(menu);
  }
}
