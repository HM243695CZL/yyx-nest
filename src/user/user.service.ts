import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { validate } from 'class-validator';
import { UserEntity } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';
import { RequestParamError } from '../common/request-param-error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ){}
  async list() {
    return await this.userRepository.find({
      relations: ['userImg'] // 联合查询
    });
  }

  async create(user) {
    const error = await validate(new UserDto(user));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamError[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    user.createdTime = new Date();
    user.lastModifiedTime = new Date();
    const { id } = await this.userRepository.save(user);
    if (id) {
      return {
        id
      }
    } else {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '新增错误',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
