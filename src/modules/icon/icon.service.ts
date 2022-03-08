import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IconEntity } from '../../entity/icon.entity';
import { success } from '../../common/res-status';
import { ResponseMessageEnum } from '../../enum/response.message.enum';
import { PageEntity } from '../../entity/page.entity';
import { createQueryCondition } from '../../common/page-query';
import { validate } from 'class-validator';
import { IconDto } from '../../dto/icon.dto';
import { RequestParamErrorEnum } from '../../enum/request-param-error.enum';

@Injectable()
export class IconService {
  constructor(
    @InjectRepository(IconEntity)
    private iconRepository: Repository<IconEntity>
  ){}

  async list() {
    const data = await this.iconRepository.find();
    return success(data, ResponseMessageEnum.OPERATE_SUCCESS);
  }


  async page(page: PageEntity) {
    const condition = createQueryCondition(page);
    const data = await this.iconRepository.findAndCount(condition);
    return success({
      data: data[0],
      totalRecords: data[1]
    }, ResponseMessageEnum.OPERATE_SUCCESS);
  }

  async create(icon, user) {
    const error = await validate(new IconDto(icon));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = {
      iconName: icon.iconName,
      createUser: user.username,
      createUserId: user.userId,
      createdTime: new Date(),
      lastModifiedTime: new Date()
    };
    const { id } = await this.iconRepository.save(data);
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
