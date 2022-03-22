import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { validate } from 'class-validator';
import { cloneDeep } from 'lodash'
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
import { UploadEntity } from '../../entity/upload.entity';

@Injectable()
export class GoodsService extends RepositoryService<GoodsEntity>{
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>,
    @InjectRepository(GoodsCarouselEntity)
    private goodsCarouselRepository: Repository<GoodsCarouselEntity>,
    @InjectRepository(GoodsGoodsArgsEntity)
    private goodsGoodsArgsRepository: Repository<GoodsGoodsArgsEntity>,
    @InjectRepository(UploadEntity)
    private uploadRepository: Repository<UploadEntity>,
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
      .orderBy({...condition.order})
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
        originPrice:  item.goods_originPrice,
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

  async update(goods, manager: EntityManager) {
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
    goods.lastModifiedTime = new Date();
    const getParams = cloneDeep(goods);
    delete goods.carousels;
    delete goods.argsIds;
    await manager.update(GoodsEntity, goods.id, {
      ...goods
    });
    // 删除之前的商品轮播图
    const carouselArr = getParams.carousels.map(item => {
      return {
        goodsId: goods.id,
        carouselId: item
      }
    });
    await manager.delete(GoodsCarouselEntity, {goodsId: goods.id});
    // 重新添加商品轮播图
    await manager.save(GoodsCarouselEntity, carouselArr);
    // 删除之前的商品参数
    const argsIdArr = getParams.argsIds.map(item => {
      return {
        goodsId: goods.id,
        goodsArgsId: item
      }
    });
    await manager.delete(GoodsGoodsArgsEntity, {goodsId: goods.id});
    // 重新添加商品参数
    await manager.save(GoodsGoodsArgsEntity, argsIdArr);
    return success({
      id: goods.id
    }, ResponseMessageEnum.UPDATE_SUCCESS);
  }

  async view({id}) {
    if (!id) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.ID_IS_NULL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = await this.goodsRepository.findOne({id});
    const coverImg = await this.uploadRepository.findOne({id: data.coverImgId});
    const goodsCarouselList = await this.goodsCarouselRepository.find({
      where: {
        goodsId: id
      }
    });
    // 获取商品封面图信息
    const carouselArr = [];
    goodsCarouselList.map(item => {
      carouselArr.push(item.carouselId)
    });
    const carouselSource = await this.uploadRepository.findByIds(carouselArr);
    // 获取商品对应的商品参数
   const result = await this.goodsGoodsArgsRepository.find({
     where: {
       goodsId: id
     }
   });
   const argsId = result.map(item => item.goodsArgsId);
    return success({
      ...data,
      source: coverImg,
      carouselSource,
      argsId,
    }, ResponseMessageEnum.OPERATE_SUCCESS);
  }

  async changeStatus(id) {
    if (!id) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.ID_IS_NULL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = await this.goodsRepository.findOne(id);
    const result = await this.goodsRepository.update(id, {
      status: data.status ? 0 : 1,
      publishTime: new Date()
    });
    if(result.affected === 1) {
      return success({}, ResponseMessageEnum.OPERATE_SUCCESS);
    } else {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.OPERATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
