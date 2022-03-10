import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsArgsController } from './goods-args.controller';
import { GoodsArgsService } from './goods-args.service';
import { GoodsArgsEntity } from '../../entity/goodsArgs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsArgsEntity])],
  controllers: [GoodsArgsController],
  providers: [GoodsArgsService]
})
export class GoodsArgsModule {}
