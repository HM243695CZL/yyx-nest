import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageEntity } from '../../entity/page.entity';
import { GoodsArgsEntity } from '../../entity/goodsArgs.entity';
import { createQueryCondition } from '../../common/page-query';
import { fail, success } from '../../common/res-status';
import { ResponseMessageEnum } from '../../enum/response.message.enum';
import { validate } from 'class-validator';
import { GoodsArgsDto } from '../../dto/goods-args.dto';
import { RequestParamErrorEnum } from '../../enum/request-param-error.enum';

@Injectable()
export class GoodsArgsService {
  constructor(
    @InjectRepository(GoodsArgsEntity)
    private goodsArgsRepository: Repository<GoodsArgsEntity>
  ){}

  async list() {
    const data = await this.goodsArgsRepository.find();
    return success(data, ResponseMessageEnum.OPERATE_SUCCESS);
  }

  async page(page: PageEntity) {
    const condition = createQueryCondition(page);
    const data = await this.goodsArgsRepository.findAndCount(condition);
    return success({
      data: data[0],
      totalRecords: data[1]
    }, ResponseMessageEnum.OPERATE_SUCCESS);
  }

  async create(goodsArgs, user) {
    const error = await validate(new GoodsArgsDto(goodsArgs));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = {
      argsCnName: goodsArgs.argsCnName,
      argsEnName: goodsArgs.argsEnName,
      createUser: user.username,
      createUserId: user.userId,
      createdTime: new Date(),
      lastModifiedTime: new Date()
    };
    const { id } = await this.goodsArgsRepository.save(data);
    if (id) {
      return success(id, ResponseMessageEnum.CREATE_SUCCESS);
    } else {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.CREATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(goodsArgs, user) {
    const error = await validate(new GoodsArgsDto(goodsArgs));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = {
      argsCnName: goodsArgs.argsCnName,
      argsEnName: goodsArgs.argsEnName,
      createUser: user.username,
      createUserId: user.userId,
      lastModifiedTime: new Date()
    };
    const result = await this.goodsArgsRepository.update(goodsArgs.id, data);
    if (result.affected) {
      return success({
        id: goodsArgs.id
      }, ResponseMessageEnum.UPDATE_SUCCESS);
    } else {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.UPDATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async view(id) {
    if (!id) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.ID_IS_NULL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = await this.goodsArgsRepository.findOne(id);
    if (data) {
      return success(data, ResponseMessageEnum.OPERATE_SUCCESS);
    } else {
      return fail('', ResponseMessageEnum.ID_IS_ERROR)
    }
  }

  async delete(id) {
    if (!id) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.ID_IS_NULL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = await this.goodsArgsRepository.delete(id);
    if (data.affected) {
      return success(id, ResponseMessageEnum.DELETE_SUCCESS);
    } else {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.DELETE_FAIL
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
