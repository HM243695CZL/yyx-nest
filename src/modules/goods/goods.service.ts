import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { validate } from 'class-validator';
import { RepositoryService } from '../../common/repository.service';
import { GoodsEntity } from '../../entity/goods.entity';
import { GoodsDto } from '../../dto/goods.dto';
import { RequestParamErrorEnum } from '../../enum/request-param-error.enum';
import { success } from '../../common/res-status';
import { ResponseMessageEnum } from '../../enum/response.message.enum';
import { GoodsCarouselEntity } from '../../entity/goods-carousel.entity';
import { GoodsGoodsArgsEntity } from '../../entity/goods-goodsArgs.entity';
import { PageEntity } from '../../entity/page.entity';
import { createQueryCondition } from '../../common/page-query';

@Injectable()
export class GoodsService extends RepositoryService<GoodsEntity>{
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>,
    @InjectRepository(GoodsCarouselEntity)
    private goodsCarouselRepository: Repository<GoodsCarouselEntity>,
    @InjectRepository(GoodsGoodsArgsEntity)
    private goodsGoodsArgsRepository: Repository<GoodsGoodsArgsEntity>
  ){
    super(goodsRepository);
  }

  async page(page: PageEntity) {
    const condition = createQueryCondition(page);
    const result = await this.goodsRepository
      .createQueryBuilder('goods')
      .innerJoinAndSelect(
        'goods-type',
        'type',
        'type.id = goods.categoryId'
      )
      .innerJoinAndSelect(
        'upload',
        'u',
        'u.id = goods.coverImgId'
      )
      .where({...condition.where})
      .offset(condition.skip)
      .limit(condition.take)
      .getRawMany();
    const total = await this.getTotal(condition.where);
    const data = [];
    result.map(item => {
      data.push({
        id: item.goods_id,
        title: item.goods_title,
        categoryId: item.type_id,
        categoryName: item.type_typeName,
        source: {
          id: item.u_id,
          originFileName: item.u_originFileName,
          size: item.u_size,
          newFileName: item.u_newFileName
        },
        sellPrice: item.goods_sellPriceStart + ' - ' + item.goods_sellPriceEnd + '￥',
        sellCount: item.goods_sellCount,
        stock: item.goods_stock,
        publishTime: item.goods_publishTime,
        status: item.goods_status
      })
    });
    return success({
      data: data,
      totalRecords: total
    }, ResponseMessageEnum.OPERATE_SUCCESS);
  }

  async getTotal(params) {
    return await this.goodsRepository.count({
      ...params
    })
  }

  async create(goods, manager: EntityManager) {
    const error = await validate(new GoodsDto(goods));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (goods.carousels.length === 0) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '商品轮播图不能为空'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    delete goods.id;
    goods.createdTime = new Date();
    goods.lastModifiedTime = new Date();
    const data = await manager.save(GoodsEntity, goods);
    const carouselArr = goods.carousels.map(item => {
      return {
        goodsId: data.id,
        carouselId: item
      }
    });
    await manager.save(GoodsCarouselEntity, carouselArr);
    const argsArr = goods.argsIds.map(item => {
      return {
        goodsId: data.id,
        goodsArgsId: item
      }
    });
    await manager.save(GoodsGoodsArgsEntity, argsArr);
    return success(data.id, ResponseMessageEnum.CREATE_SUCCESS);
  }
}
