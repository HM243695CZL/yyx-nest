import { Body, Controller, Get, Post, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GoodsArgsService } from './goods-args.service';
import { PageEntity } from '../../entity/page.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GoodsArgsDto } from '../../dto/goods-args.dto';
import { CommonDto } from '../../dto/common.dto';

@ApiTags('商品参数管理')
@Controller('goods-args')
export class GoodsArgsController {
  constructor(
    private readonly goodsArgsService: GoodsArgsService
  ){}

  @Get('list')
  @ApiOperation({summary: '获取所有商品参数'})
  async list() {
    return await this.goodsArgsService.list();
  }

  @Post('page')
  @ApiOperation({summary: '分页'})
  async page(@Body() page: PageEntity): Promise<any> {
    return await this.goodsArgsService.page(page);
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

  @Get('view')
  @ApiOperation({summary: '查看商品参数'})
  async view(@Query() id: CommonDto): Promise<any> {
    return await this.goodsArgsService.view(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('delete')
  @ApiOperation({summary: '删除商品参数'})
  async delete(@Query() id: CommonDto): Promise<any> {
    return await this.goodsArgsService.delete(id);
  }
}
