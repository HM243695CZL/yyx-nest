import { Body, Controller, Get, Post, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GoodsTypeService } from './goods-type.service';
import { PageEntity } from '../../entity/page.entity';
import { GoodsTypeDto } from '../../dto/goodsType.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CommonDto } from '../../dto/common.dto';

@ApiTags('商品类型管理')
@Controller('goods-type')
export class GoodsTypeController {
  constructor(
    private readonly goodsTypeService: GoodsTypeService
  ){}

  @Get('list')
  @ApiOperation({summary: '获取所有商品类型'})
  async list() {
    return await this.goodsTypeService.list();
  }

  @Post('page')
  @ApiOperation({summary: '分页'})
  async page(@Body() page: PageEntity): Promise<any> {
    return await this.goodsTypeService.page(page);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({summary: '新增商品类型'})
  async create(@Body() goodsType: GoodsTypeDto, @Request() req): Promise<any> {
    return await this.goodsTypeService.create(goodsType, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @ApiOperation({summary: '更新商品类型'})
  async update(@Body() goodsType: GoodsTypeDto, @Request() req): Promise<any> {
    return await this.goodsTypeService.update(goodsType, req.user);
  }

  @Get('view')
  @ApiOperation({summary: '查看商品类型'})
  async view(@Query() id: CommonDto): Promise<any> {
    return await this.goodsTypeService.view(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('delete')
  @ApiOperation({summary: '删除商品类型'})
  async delete(@Query() id: CommonDto): Promise<any> {
    return await this.goodsTypeService.delete(id);
  }
}
