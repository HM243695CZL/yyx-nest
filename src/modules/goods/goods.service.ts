import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '../../common/repository.service';
import { GoodsEntity } from '../../entity/goods.entity';
import { EntityManager, Repository } from 'typeorm';
import { validate } from 'class-validator';
import { GoodsDto } from '../../dto/goods.dto';
import { RequestParamErrorEnum } from '../../enum/request-param-error.enum';

@Injectable()
export class GoodsService extends RepositoryService<GoodsEntity>{
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>
  ){
    super(goodsRepository);
  }

  async create(goods, manager: EntityManager) {
    const error = await validate(new GoodsDto(goods));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
