import {
  Entity, PrimaryGeneratedColumn,
  Column, CreateDateColumn, UpdateDateColumn
} from 'typeorm';

@Entity({name: 'goods-type'})
export class GoodsTypeEntity {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({comment: '分类名称', unique: true})
  typeName: string;

  @Column({comment: '创建分类的用户名称'})
  createUser: string;

  @Column({comment: '创建分类的用户id'})
  createUserId: string;

  @CreateDateColumn({comment: '创建时间'})
  createdTime: Date;

  @UpdateDateColumn({comment: '更新时间'})
  lastModifiedTime: Date;
}
