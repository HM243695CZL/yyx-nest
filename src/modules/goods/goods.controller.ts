import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BaseController } from '../../common/base.controller';
import { GoodsService } from './goods.service';
import { GoodsDto } from '../../dto/goods.dto';
import { EntityManager, TransactionManager, Transaction } from 'typeorm';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('商品管理')
@Controller('goods')
export class GoodsController extends BaseController{
  constructor(
    private readonly goodsService: GoodsService
  ){
    super(goodsService);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({summary: '新增商品'})
  @Transaction()
  async create(@Body() goods: GoodsDto, @TransactionManager() manager: EntityManager): Promise<any> {
    return await this.goodsService.create(goods, manager);
  }
}
