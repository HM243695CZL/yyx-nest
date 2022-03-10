import { Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn
} from 'typeorm';

@Entity({name: 'goods-args'})
export class GoodsArgsEntity {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({comment: '参数中文名', unique: true})
  argsCnName: string;

  @Column({comment: '参数英文名', unique: true})
  argsEnName: string;

  @Column({comment: '创建参数的用户名称'})
  createUser: string;

  @Column({comment: '创建参数的用户id'})
  createUserId: string;

  @CreateDateColumn({comment: '创建时间'})
  createdTime: Date;

  @UpdateDateColumn({comment: '更新时间'})
  lastModifiedTime: Date;
}
