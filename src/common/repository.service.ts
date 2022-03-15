import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { success, fail } from './res-status';
import { ResponseMessageEnum } from '../enum/response.message.enum';
import { PageEntity } from '../entity/page.entity';
import { createQueryCondition } from './page-query';

@Injectable()
export class RepositoryService <T>{
  constructor(
    private repository: Repository<T>
  ){}

  async list() {
    const data = await this.repository.find();
    return success(data, ResponseMessageEnum.OPERATE_SUCCESS);
  }

  async page(page: PageEntity): Promise<any> {
    const condition = createQueryCondition(page);
    // @ts-ignore
    const data = await this.repository.findAndCount(condition);
    return success({
      data: data[0],
      totalRecords: data[1]
    }, ResponseMessageEnum.OPERATE_SUCCESS);
  }
  async view(id) {
    if (!id) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.ID_IS_NULL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // @ts-ignore
    const data = await this.repository.findOne(id);
    if (data) {
      return success(data, ResponseMessageEnum.OPERATE_SUCCESS);
    } else {
      return fail('', ResponseMessageEnum.ID_IS_ERROR);
    }
  }

  async delete(id) {
    if (!id) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.ID_IS_NULL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = await this.repository.delete(id);
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
