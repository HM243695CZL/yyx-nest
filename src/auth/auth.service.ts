import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';
import { success } from '../common/res-status';
import { ResponseMessageEnum } from '../enum/response.message.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user) {
      if (user.password === password) {
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
    const payload = { username: user.username, sub: user.userId };
    return success({
      access_token: this.jwtService.sign(payload)
    }, ResponseMessageEnum.OPERATE_SUCCESS);
  }
}
