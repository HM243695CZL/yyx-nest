import { Body, Controller, Get, Post, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IconService } from './icon.service';
import { IconDto } from '../../dto/icon.dto';
import { PageEntity } from '../../entity/page.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CommonDto } from '../../dto/common.dto';

@ApiTags('图标管理')
@Controller('icon')
export class IconController {
  constructor(
    private readonly iconService: IconService,
  ){}

  @Get('list')
  @ApiOperation({ summary: '获取所有图标'})
  async list() {
    return await this.iconService.list();
  }

  @Post('page')
  @ApiOperation({summary: '分页'})
  async page(@Body() page: PageEntity): Promise<any> {
    return await this.iconService.page(page);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({summary: '新增图标'})
  async create(@Body() icon: IconDto, @Request() req): Promise<any> {
    return await this.iconService.create(icon, req.user);
  }

  @Get('delete')
  @ApiOperation({summary: '删除图标'})
  async delete(@Query() id: CommonDto): Promise<any> {
    return await this.iconService.delete(id);
  }

}
