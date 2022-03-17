import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({name: 'role'})
export class RoleEntity extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({comment: '角色名称', unique: true})
  name: string;

  @Column({comment: '备注', nullable: true})
  remark: string;

  @Column({comment: '创建角色的用户名称'})
  createUser: string;

  @Column({comment: '创建角色的用户id'})
  createUserId: string;
}
