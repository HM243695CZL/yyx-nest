import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../modules/user/user.service';
import { success, fail } from '../common/res-status';
import { ResponseMessageEnum } from '../enum/response.message.enum';
import { generatorMd5 } from '../utils/tools';
import { UserRoleEntity } from '../entity/user-role.entity';
import { Repository } from 'typeorm';
import { RoleMenuEntity } from '../entity/role-menu.entity';
import { MenuService } from '../modules/menu/menu.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private menuService: MenuService,
    @InjectRepository(UserRoleEntity)
    private userRoleRepository: Repository<UserRoleEntity>,
    @InjectRepository(RoleMenuEntity)
    private roleMenuRepository: Repository<RoleMenuEntity>
  ){}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user) {
      if (user.password === generatorMd5(password)) {
        const { password, ...result} = user;
        return result;
      } else {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: '密码错误'
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '用户名不存在'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      userId: user['id'],
      status: user.status,
      mobile: user.mobile,
      email: user.email,
    };
    const data = await this.menuService.getMenuAuth(user['id']);
    return success({
      menu: data,
      access_token: this.jwtService.sign(payload),
      userInfo: payload
    }, ResponseMessageEnum.OPERATE_SUCCESS);
  }
}
