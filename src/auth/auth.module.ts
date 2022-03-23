import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserModule } from '../modules/user/user.module';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from '../common/constant';
import { JwtStrategy } from './jwt.strategy';
import { UserRoleEntity } from '../entity/user-role.entity';
import { RoleMenuEntity } from '../entity/role-menu.entity';
import { MenuModule } from '../modules/menu/menu.module';

@Module({
  imports: [
    UserModule, PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '12h'
      }
    }),
    MenuModule,
    TypeOrmModule.forFeature([UserRoleEntity, RoleMenuEntity])
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}

