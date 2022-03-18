import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuEntity } from '../../entity/menu.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    RoleModule,
    TypeOrmModule.forFeature([MenuEntity])
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService]
})
export class MenuModule {}
