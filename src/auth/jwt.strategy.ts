import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy} from 'passport-jwt';
import { jwtConstants } from '../common/constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 提取请求头中的 Authorization 承载的 Token 信息
      ignoreExpiration: false, // 默认 false ，对于没有过期的 JWT 信息继续委托 Passport 下的任务，过期则提示 401 的 http 状态码
      secretOrKey: jwtConstants.secret // 签名所需要的密钥信息
    })
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username
    }
  }
}
