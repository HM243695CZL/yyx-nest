import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { MenuEntity } from '../../entity/menu.entity';
import { success } from '../../common/res-status';
import { ResponseMessageEnum } from '../../enum/response.message.enum';
import { PageEntity } from '../../entity/page.entity';
import { createQueryCondition } from '../../common/page-query';
import { MenuDto } from '../../dto/menu.dto';
import { RequestParamErrorEnum } from '../../enum/request-param-error.enum';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>
  ){}
  async list() {
    const data = await this.menuRepository.find();
    return success(data, ResponseMessageEnum.OPERATE_SUCCESS);
  }

  async page(page: PageEntity) {
    const condition = createQueryCondition(page);
    const data = await this.menuRepository.findAndCount(condition);
    return success({
      data: data[0],
      totalRecords: data[1]
    }, ResponseMessageEnum.OPERATE_SUCCESS);
  }

  async create(menu) {
    const error = await validate(new MenuDto(menu));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    delete menu.id;
    menu.createdTime = new Date();
    menu.lastModifiedTime = new Date();
    const {id} = await this.menuRepository.save(menu);
    if (id) {
      return success(id, ResponseMessageEnum.CREATE_SUCCESS);
    } else {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.CREATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
