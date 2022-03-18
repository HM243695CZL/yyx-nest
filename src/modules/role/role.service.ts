import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { isEmpty, map } from 'lodash';
import { RoleEntity } from '../../entity/role.entity';
import { success } from '../../common/res-status';
import { ResponseMessageEnum } from '../../enum/response.message.enum';
import { validate } from 'class-validator';
import { RoleDto } from '../../dto/role.dto';
import { RequestParamErrorEnum } from '../../enum/request-param-error.enum';
import { RepositoryService } from '../../common/repository.service';
import { RoleMenuEntity } from '../../entity/role-menu.entity';
import { CommonDto } from '../../dto/common.dto';
import { UserRoleEntity } from '../../entity/user-role.entity';

@Injectable()
export class RoleService extends RepositoryService<RoleEntity>{
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    @InjectRepository(RoleMenuEntity)
    private roleMenuRepository: Repository<RoleMenuEntity>,
    @InjectRepository(UserRoleEntity)
    private userRoleRepository: Repository<UserRoleEntity>
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

  /**
   * 根据用户id查找角色信息
   * @param userId 用户id
   */
  async getRoleIdByUser(userId){
    const result = await this.userRoleRepository.find({
      where: {
        userId
      }
    });
    if(!isEmpty(result)) {
      return map(result, item => {
        return item.roleId
      })
    }
    return [];
  }

  async delete({id}) {
    const count = await this.countUserIdByRole(id);
    if (count > 0) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '该角色存在关联用户，请先删除关联用户'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const data = await this.roleRepository.delete({id});
    if (data.affected === 1) {
      return success(id, ResponseMessageEnum.DELETE_SUCCESS);
    } else {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.DELETE_FAIL
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 根据角色id查询关联用户id
   * @param roleId
   */
  async countUserIdByRole(roleId): Promise<any> {
    return await this.userRoleRepository.count({
      roleId: In([roleId])
    });
  }
}
