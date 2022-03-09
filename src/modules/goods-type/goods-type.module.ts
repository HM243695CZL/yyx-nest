import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsTypeController } from './goods-type.controller';
import { GoodsTypeService } from './goods-type.service';
import { GoodsTypeEntity } from '../../entity/goodsType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsTypeEntity])],
  controllers: [GoodsTypeController],
  providers: [GoodsTypeService]
})
export class GoodsTypeModule {}
