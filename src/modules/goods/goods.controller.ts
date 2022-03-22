import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BaseController } from '../../common/base.controller';
import { GoodsService } from './goods.service';
import { GoodsDto } from '../../dto/goods.dto';
import { EntityManager, TransactionManager, Transaction } from 'typeorm';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CommonDto } from '../../dto/common.dto';

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

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @ApiOperation({summary: '更新商品'})
  @Transaction()
  async update(@Body() goods: GoodsDto, @TransactionManager() manager: EntityManager): Promise<any> {
    return await this.goodsService.update(goods, manager);
  }

  @UseGuards(JwtAuthGuard)
  @Get('changeStatus')
  @ApiOperation({summary: '上架或下架商品'})
  async changeStatus(@Query() id: CommonDto) {
    return await this.goodsService.changeStatus(id);
  }
}
