import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UploadEntity } from './upload.entity';

@Entity({name: 'user'})
export class UserEntity {

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

  @Column({comment: '状态 0：禁用 1：启用'})
  status: boolean;

  @CreateDateColumn({comment: '创建时间', select: false})
  createdTime: Date;

  @UpdateDateColumn({comment: '更新时间', select: false})
  lastModifiedTime: Date;

}
