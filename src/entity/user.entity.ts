import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';
import { UploadEntity } from './upload.entity';
import { RoleEntity as Role } from './role.entity';

@Entity({name: 'user'})
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 20, comment: '用户名', unique: true})
  username: string;

  @Column({comment: '密码', select: false})
  password: string;

  @Column({comment: '邮箱', nullable: true})
  email: string;

  @Column({comment: '手机号'})
  mobile: string;

  @OneToOne(() => UploadEntity)
  @JoinColumn()
  userImg: UploadEntity;

  @ManyToMany(type => Role, role => role)
  @JoinTable({
    name: 'user-role',
    joinColumn: {name: 'userId'},
    inverseJoinColumn: { name: 'roleId'}
  })
  roles: Role[];

  @Column({comment: '状态 0：禁用 1：启用', default: 1})
  status: number;

  @CreateDateColumn({comment: '创建时间', select: false})
  createdTime: Date;

  @UpdateDateColumn({comment: '更新时间', select: false})
  lastModifiedTime: Date;

}
