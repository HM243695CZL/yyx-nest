import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { GoodsEntity } from '../../entity/goods.entity';
import { GoodsCarouselEntity } from '../../entity/goods-carousel.entity';
import { GoodsGoodsArgsEntity } from '../../entity/goods-goodsArgs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GoodsEntity, GoodsCarouselEntity, GoodsGoodsArgsEntity]
    )],
  controllers: [GoodsController],
  providers: [GoodsService]
})
export class GoodsModule {}
