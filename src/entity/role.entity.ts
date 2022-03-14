import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { UserEntity as User } from './user.entity';

@Entity({name: 'role'})
export class RoleEntity {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({comment: '角色名称', unique: true})
  name: string;

  @Column({comment: '创建角色的用户名称'})
  createUser: string;

  @Column({comment: '创建角色的用户id'})
  createUserId: string;

  @ManyToMany(type => User, user => user.roles)
  @JoinTable({
    name: 'user-role',
    joinColumn: { name: 'roleId'},
    inverseJoinColumn: { name: 'userId'}
  })
  users: User[];

  @CreateDateColumn({comment: '创建时间', select: false})
  createdTime: Date;

  @UpdateDateColumn({comment: '更新时间', select: false})
  lastModifiedTime: Date;
}
