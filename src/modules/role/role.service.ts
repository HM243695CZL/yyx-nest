import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../entity/role.entity';
import { success } from '../../common/res-status';
import { ResponseMessageEnum } from '../../enum/response.message.enum';
import { validate } from 'class-validator';
import { RoleDto, RoleMenuDto } from '../../dto/role.dto';
import { RequestParamErrorEnum } from '../../enum/request-param-error.enum';
import { RepositoryService } from '../../common/repository.service';
import { RoleMenuEntity } from '../../entity/role-menu.entity';
import { CommonDto } from '../../dto/common.dto';

@Injectable()
export class RoleService extends RepositoryService<RoleEntity>{
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    @InjectRepository(RoleMenuEntity)
    private roleMenuRepository: Repository<RoleMenuEntity>
  ) {
    super(roleRepository);
  }

  async create(role, user: any) {
    const error = await validate(new RoleDto(role));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = {
      name: role.name,
      remark: role.remark,
      createUser: user.username,
      createUserId: user.userId,
      createdTime: new Date(),
      lastModifiedTime: new Date()
    };
    const { id } = await this.roleRepository.save(data);
    if (id) {
      return success(id, ResponseMessageEnum.CREATE_SUCCESS);
    } else {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.CREATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(role, user: any) {
    const error = await validate(new RoleDto(role));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = {
      name: role.name,
      remark: role.remark,
      createUser: user.username,
      createUserId: user.userId,
      lastModifiedTime: new Date()
    };
    const result = await this.roleRepository.update(role.id, data);
    if (result.affected) {
      return success({
        id: role.id
      }, ResponseMessageEnum.UPDATE_SUCCESS);
    } else {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.UPDATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async divideAuth(param) {
    const arr = [];
    param.menus.map(item => {
      arr.push({
        roleId: param.id,
        menuId: item
      })
    });
    // 删除原来的权限
    await this.roleMenuRepository.delete({roleId: param.id});
    const data = await this.roleMenuRepository.save(arr);
    if (data.length === param.menus.length) {
      return success({}, ResponseMessageEnum.OPERATE_SUCCESS);
    } else {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.CREATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getDivideAuth({id}: CommonDto) {
    const data = await this.roleMenuRepository.find({
      where: {
        roleId: id
      }
    });
    const result = data.map(item => {
      return item.menuId;
    });
    return success(result, ResponseMessageEnum.OPERATE_SUCCESS);
  }
}
