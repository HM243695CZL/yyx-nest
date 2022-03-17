import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleEntity } from '../../entity/role.entity';
import { RoleMenuEntity } from '../../entity/role-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, RoleMenuEntity])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
