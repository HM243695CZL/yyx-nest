import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleEntity } from '../../entity/role.entity';
import { RoleMenuEntity } from '../../entity/role-menu.entity';
import { UserRoleEntity } from '../../entity/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, RoleMenuEntity, UserRoleEntity])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
