import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { UserEntity } from '../../entity/user.entity';
import { UserDto } from '../../dto/user.dto';
import { RequestParamErrorEnum } from '../../enum/request-param-error.enum';
import { ResponseMessageEnum } from '../../enum/response.message.enum';
import { success, fail } from '../../common/res-status';
import { PageEntity } from '../../entity/page.entity';
import { createQueryCondition } from '../../common/page-query';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ){}
  async list() {
    const data = await this.userRepository.find({
      relations: ['userImg'] // 联合查询
    });
    return success(data, ResponseMessageEnum.OPERATE_SUCCESS);
  }

  /**
   * 根据用户名查找
   * @param username 用户名
   */
  async findByUsername(username: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', {username})
      .addSelect('user.id')
      .addSelect('user.username')
      .addSelect('user.password')
      .addSelect('user.email')
      .addSelect('user.mobile')
      .getOne();
  }

  async page(page: PageEntity) {
    const condition = createQueryCondition(page);
    const data = await this.userRepository.findAndCount(condition);
    return success({
      data: data[0],
      totalRecords: data[1]
    }, ResponseMessageEnum.OPERATE_SUCCESS);
  }

  async create(user) {
    const error = await validate(new UserDto(user));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    delete user.id;
    user.createdTime = new Date();
    user.lastModifiedTime = new Date();
    const { id } = await this.userRepository.save(user);
    if (id) {
      return success(id, ResponseMessageEnum.CREATE_SUCCESS);
    } else {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.CREATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(user) {
    const error = await validate(new UserDto(user));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    user.lastModifiedTime = new Date();
    const data = await this.userRepository.update(user.id, user);
    if (data.affected) {
      return success({
        id: user.id
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
    const data = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', {id})
      .addSelect('user.id')
      .addSelect('user.username')
      .addSelect('user.password')
      .addSelect('user.email')
      .addSelect('user.mobile')
      .getOne();
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
    const data = await this.userRepository.delete(id);
    if (data.affected) {
      return success(id, ResponseMessageEnum.DELETE_SUCCESS);
    } else {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.DELETE_FAIL
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async changeStatus(id) {
    if (!id) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.ID_IS_NULL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = await this.userRepository.findOne(id);
    const result = await this.userRepository.update(id, {status: data.status ? 0 : 1});
    if(result.affected) {
      return success({}, ResponseMessageEnum.OPERATE_SUCCESS);
    } else {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.OPERATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
