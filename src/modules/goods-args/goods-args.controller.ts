import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GoodsArgsService } from './goods-args.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GoodsArgsDto } from '../../dto/goods-args.dto';
import { BaseController } from '../../common/base.controller';

@ApiTags('商品参数管理')
@Controller('goods-args')
export class GoodsArgsController extends BaseController{
  constructor(
    private readonly goodsArgsService: GoodsArgsService
  ){
    super(goodsArgsService);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({summary: '新增商品参数'})
  async create(@Body() goodsArgs: GoodsArgsDto, @Request() req): Promise<any> {
    return await this.goodsArgsService.create(goodsArgs, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @ApiOperation({summary: '更新商品参数'})
  async update(@Body() goodsArgs: GoodsArgsDto, @Request() req): Promise<any> {
    return await this.goodsArgsService.update(goodsArgs, req.user);
  }
}
