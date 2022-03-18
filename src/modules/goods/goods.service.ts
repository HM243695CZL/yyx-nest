import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '../../common/repository.service';
import { GoodsEntity } from '../../entity/goods.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoodsService extends RepositoryService<GoodsEntity>{
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>
  ){
    super(goodsRepository);
  }
}
