import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GoodsTypeService } from './goods-type.service';
import { GoodsTypeDto } from '../../dto/goodsType.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BaseController } from '../../common/base.controller';

@ApiTags('商品类型管理')
@Controller('goods-type')
export class GoodsTypeController extends BaseController{
  constructor(
    private readonly goodsTypeService: GoodsTypeService
  ){
    super(goodsTypeService);
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
}
