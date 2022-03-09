import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsTypeEntity } from '../../entity/goodsType.entity';
import { success } from '../../common/res-status';
import { ResponseMessageEnum } from '../../enum/response.message.enum';
import { PageEntity } from '../../entity/page.entity';
import { createQueryCondition } from '../../common/page-query';
import { validate } from 'class-validator';
import { GoodsTypeDto } from '../../dto/goodsType.dto';
import { RequestParamErrorEnum } from '../../enum/request-param-error.enum';


@Injectable()
export class GoodsTypeService {
  constructor(
    @InjectRepository(GoodsTypeEntity)
    private goodsTypeRepository: Repository<GoodsTypeEntity>
  ){}

  async list() {
    const data = await this.goodsTypeRepository.find();
    return success(data, ResponseMessageEnum.OPERATE_SUCCESS);
  }

  async page(page: PageEntity) {
    const condition = createQueryCondition(page);
    const data = await this.goodsTypeRepository.findAndCount(condition);
    return success({
      data: data[0],
      totalRecords: data[1]
    }, ResponseMessageEnum.OPERATE_SUCCESS);
  }

  async create(goodsType, user) {
    const error = await validate(new GoodsTypeDto(goodsType));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = {
      typeName: goodsType.typeName,
      createUser: user.username,
      createUserId: user.userId,
      createdTime: new Date(),
      lastModifiedTime: new Date()
    };
    const { id } = await this.goodsTypeRepository.save(data);
    if (id) {
      return success(id, ResponseMessageEnum.CREATE_SUCCESS);
    } else {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.CREATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(goodsType, user) {
    const error = await validate(new GoodsTypeDto(goodsType));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = {
      typeName: goodsType.typeName,
      createUser: user.username,
      createUserId: user.userId,
      lastModifiedTime: new Date()
    };
    const result = await this.goodsTypeRepository.update(goodsType.id, data);
    if (result.affected) {
      return success({
        id: goodsType.id
      }, ResponseMessageEnum.UPDATE_SUCCESS);
    } else {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.UPDATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
