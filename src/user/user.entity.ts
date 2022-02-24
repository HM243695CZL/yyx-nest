import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UploadEntity } from '../upload/upload.entity';

@Entity({name: 'user'})
export class UserEntity {

  @PrimaryGeneratedColumn({comment: 'id'})
  id: number;

  @Column({ length: 20, comment: '用户名'})
  username: string;

  @Column({comment: '密码'})
  password: string;

  @Column({comment: '邮箱'})
  email: string;

  @Column({comment: '手机号'})
  mobile: string;

  @OneToOne(() => UploadEntity)
  @JoinColumn()
  userImg: UploadEntity;

  @Column({comment: '状态 0：禁用 1：启用'})
  status: boolean;

  @Column({comment: '创建时间'})
  createdTime: Date;

  @Column({comment: '更新时间'})
  lastModifiedTime: Date;

}
