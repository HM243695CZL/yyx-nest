import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { validate } from 'class-validator';
import { MenuEntity } from '../../entity/menu.entity';
import { fail, success } from '../../common/res-status';
import { ResponseMessageEnum } from '../../enum/response.message.enum';
import { MenuDto } from '../../dto/menu.dto';
import { RequestParamErrorEnum } from '../../enum/request-param-error.enum';
import { RepositoryService } from '../../common/repository.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class MenuService extends RepositoryService<MenuEntity>{
  constructor(
    private roleService: RoleService,
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>
  ){
    super(menuRepository);
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

  async update(menu) {
    const error = await validate(new MenuDto(menu));
    if (error.length) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error[0].property}${RequestParamErrorEnum[Object.keys(error[0].constraints)[0]]}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    menu.lastModifiedTime = new Date();
    const data = await this.menuRepository.update(menu.id, menu);
    if (data.affected) {
      return success({
        id: menu.id
      }, ResponseMessageEnum.UPDATE_SUCCESS);
    } else {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.UPDATE_FAIL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete({id}) {
    if (!id) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.ID_IS_NULL,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // 如果存在子菜单，则不能删除
    const data = await this.menuRepository.find({
      where: {
        parentId: Equal(id)
      }
    });
    if (data.length) {
      return fail({}, '存在子菜单，不能删除');
    }
    const delData = await this.menuRepository.delete(id);
    if (delData.affected) {
      return success(id, ResponseMessageEnum.DELETE_SUCCESS);
    } else {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.DELETE_FAIL
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 获取用户对应的菜单权限
   */
  async getMenuAuth(userId) {
    const roleIds = await this.roleService.getRoleIdByUser(userId);
    return await this.menuRepository
      .createQueryBuilder('menu')
      .innerJoinAndSelect(
        'role-menu',
        'role_menu',
        'menu.id = role_menu.menuId'
      )
      .andWhere('role_menu.roleId IN (:...roldIds)', { roldIds: roleIds})
      .getMany();
  }
}
