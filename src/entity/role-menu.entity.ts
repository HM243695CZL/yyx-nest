import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

@Entity({name: 'role-menu'})
export class RoleMenuEntity extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  roleId: string;

  @Column()
  @ApiProperty()
  menuId: string;
}
