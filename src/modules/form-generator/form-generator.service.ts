import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { FormGeneratorEntity } from '../../entity/formGenerator.entity';
import { fail, success } from '../../common/res-status';
import { ResponseMessageEnum } from '../../enum/response.message.enum';
import { FormGeneratorDto } from '../../dto/formGenerator.dto';
import { RequestParamErrorEnum } from '../../enum/request-param-error.enum';
import { RepositoryService } from '../../common/repository.service';

@Injectable()
export class FormGeneratorService extends RepositoryService<FormGeneratorEntity>{
  constructor(
    @InjectRepository(FormGeneratorEntity)
    private formGeneratorRepository: Repository<FormGeneratorEntity>
  ){
    super(formGeneratorRepository);
  }

  async create(formGenerator) {
    const error = await validate(new FormGeneratorDto(formGenerator));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    delete formGenerator.id;
    formGenerator.createdTime = new Date();
    formGenerator.lastModifiedTime = new Date();
    const { id } = await this.formGeneratorRepository.save(formGenerator);
    if (id) {
      return success(id, ResponseMessageEnum.CREATE_SUCCESS);
    } else {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.CREATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(formGenerator) {
    const error = await validate(new FormGeneratorDto(formGenerator));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    formGenerator.lastModifiedTime = new Date();
    const data = await this.formGeneratorRepository.update(formGenerator.id, formGenerator);
    if (data.affected) {
      return success({
        id: formGenerator.id
      }, ResponseMessageEnum.UPDATE_SUCCESS);
    } else {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.UPDATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async view(formKey) {
    if (!formKey) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'formKey 不能为空',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = await this.formGeneratorRepository.findOne(formKey);
    if (data) {
      return success(data, ResponseMessageEnum.OPERATE_SUCCESS);
    } else {
      return fail('', 'formKey 出错了')
    }
  }
}
