import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name: 'icon'})
export class IconEntity {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({comment: '图标名称'})
  iconName: string;

  @Column({comment: '创建图标的用户名称'})
  createUser: string;

  @Column({comment: '创建图标的用户id'})
  createUserId: string;

  @CreateDateColumn({comment: '创建时间'})
  createdTime: Date;

  @UpdateDateColumn({comment: '更新时间'})
  lastModifiedTime: Date;
}
