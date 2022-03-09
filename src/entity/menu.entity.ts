import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({name: 'menu'})
export class MenuEntity {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 20, comment: '菜单名称'})
  title: string;

  @Column({ comment: '菜单地址', unique: true})
  path: string;

  @Column({comment: '图标'})
  icon: string;

  @Column({comment: '类型：1 菜单 2 目录'})
  type: number;

  @Column({comment: '菜单排序'})
  sortNum: number;

  @Column({comment: '上级菜单', nullable: true})
  parentId: string;

  @Column({comment: '是否隐藏： 1 是 0 否', default: 0, nullable: true})
  hidden: number;

  @CreateDateColumn({comment: '创建时间', select: false})
  createdTime: Date;

  @UpdateDateColumn({comment: '更新时间', select: false})
  lastModifiedTime: Date;
}
