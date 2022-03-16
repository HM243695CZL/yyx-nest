import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UploadEntity } from './upload.entity';
import { BaseEntity } from './base.entity';

@Entity({name: 'user'})
export class UserEntity extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 20, comment: '用户名', unique: true})
  username: string;

  @Column({comment: '密码'})
  password: string;

  @Column({comment: '邮箱', nullable: true})
  email: string;

  @Column({comment: '手机号'})
  mobile: string;

  @OneToOne(() => UploadEntity)
  @JoinColumn()
  userImg: UploadEntity;

  @Column({comment: '备注', nullable: true})
  remark: string;

  @Column({comment: '状态 0：禁用 1：启用', default: 1})
  status: number;
}
