import { Controller } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BaseController } from '../../common/base.controller';
import { GoodsService } from './goods.service';

@ApiTags('商品管理')
@Controller('goods')
export class GoodsController extends BaseController{
  constructor(
    private readonly goodsService: GoodsService
  ){
    super(goodsService);
  }
}
