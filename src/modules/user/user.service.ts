import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, In } from 'typeorm';
import { validate } from 'class-validator';
import { findIndex } from 'lodash';
import { UserEntity } from '../../entity/user.entity';
import { UserRoleEntity } from '../../entity/user-role.entity';
import { EditPassDto, UserDto } from '../../dto/user.dto';
import { RequestParamErrorEnum } from '../../enum/request-param-error.enum';
import { INIT_PASS, ResponseMessageEnum } from '../../enum/response.message.enum';
import { success, fail } from '../../common/res-status';
import { RepositoryService } from '../../common/repository.service';
import { PageEntity } from '../../entity/page.entity';
import { createQueryCondition } from '../../common/page-query';
import { generatorMd5 } from '../../utils/tools';

@Injectable()
export class UserService extends RepositoryService<UserEntity>{
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserRoleEntity)
    private userRoleRepository: Repository<UserRoleEntity>,
  ){
    super(userRepository)
  }
  async list() {
    const data = await this.userRepository.find({
      relations: ['userImg'] // 联合查询
    });
    return success(data, ResponseMessageEnum.OPERATE_SUCCESS);
  }

  async page(page: PageEntity) {
    const condition = createQueryCondition(page);
    const result = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect(
        'user-role',
        'user_role',
        'user_role.userId = user.id'
      )
      .innerJoinAndSelect(
        'role',
        'role',
        'role.id = user_role.roleId'
      )
      .where({...condition.where})
      .offset(condition.skip)
      .limit(condition.take)
      .getRawMany();
    const total = await this.getTotal(condition.where);
    const data = [];
    result.map(item => {
      const index = findIndex(data, e => {
        return e.id === item.user_id
      });
      if (index < 0) {
        // 当元素不存在时插入
        data.push({
          id: item.user_id,
          username: item.user_username,
          email: item.user_email,
          mobile: item.user_mobile,
          remark: item.user_remark,
          status: item.user_status,
          roleNames: [item.role_name]
        })
      } else {
        // 已存在
        data[index].roleNames.push(item.role_name);
      }
    });
    return success({
      data: data,
      totalRecords: total
    }, ResponseMessageEnum.OPERATE_SUCCESS);
  }

  async getTotal(params) {
    return await this.userRepository.count({
      ...params
    });
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

  async create(user, manager: EntityManager) {
    const error = await validate(new UserDto(user));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!user.roles || user.roles.length === 0) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '角色不能为空'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    delete user.id;
    user.createdTime = new Date();
    user.lastModifiedTime = new Date();
    user.password = generatorMd5(INIT_PASS);
    const data = await manager.save(UserEntity, user);
    const roleObj = user.roles.map(item => {
      return {
        userId: data.id,
        roleId: item
      }
    });
    await manager.save(UserRoleEntity, roleObj);
    return success(data.id, ResponseMessageEnum.CREATE_SUCCESS);
  }

  async update(user, manager: EntityManager) {
    const error = await validate(new UserDto(user));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!user.roles || user.roles.length === 0) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '角色不能为空'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    user.lastModifiedTime = new Date();
    const {username, email, mobile, remark} = user;
    await manager.update(UserEntity, user.id, {
      username, email, mobile, remark
    });
    // 删除原来的角色关系
    await manager.delete(UserRoleEntity, {userId: user.id});
    const roleObj = user.roles.map(item => {
      return {
        roleId: item,
        userId: user.id
      }
    });
    // 重新分配角色
    await manager.save(UserRoleEntity, roleObj);
    return success({
      id: user.id
    }, ResponseMessageEnum.UPDATE_SUCCESS);
  }

  async view({id}) {
    if (!id) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.ID_IS_NULL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = await this.userRepository.findOne({id});
    const roleRows = await this.userRoleRepository.find({userId: id});
    const roles = roleRows.map(item => {
      return item.roleId
    });
    delete data.password;
    if (data) {
      return success({...data, roles }, ResponseMessageEnum.OPERATE_SUCCESS);
    } else {
      return fail('', ResponseMessageEnum.ID_IS_ERROR)
    }
  }

  async delete({id}) {
    if (!id) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.ID_IS_NULL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = await this.userRepository.delete(id);
    await this.userRoleRepository.delete({userId: In([id])});
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

  async changePass(param: EditPassDto) {
    const error = await validate(new EditPassDto(param));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = await this.userRepository.findOne(param.id);
    const result = await this.userRepository.update(data.id, {
      password: generatorMd5(param.password)
    });
    if (result.affected === 1) {
      return success({}, ResponseMessageEnum.OPERATE_SUCCESS);
    } else {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.OPERATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
