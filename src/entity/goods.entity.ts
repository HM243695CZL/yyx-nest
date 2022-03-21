import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({name: 'goods'})
export class GoodsEntity extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({comment: '商品描述'})
  title: string;

  @Column({comment: '商品原价'})
  originPrice: string;

  @Column({comment: '商品售价上限'})
  sellPriceStart: string;

  @Column({comment: '商品售价下限'})
  sellPriceEnd: string;

  @Column({comment: '商品分类id'})
  categoryId: string;

  @Column({comment: '商品库存'})
  stock: number;

  @Column({comment: '已售数量', default: 0})
  sellCount: number;

  @Column({comment: '发货时间'})
  deliveryTime: number;

  @Column({comment: '封面图id'})
  coverImgId: string;

  @Column({comment: '是否包邮 1： 是 0：否 ', default: 1})
  freeShopping: number;

  @Column({comment: '关于商品'})
  aboutGoods: string;

  @Column({comment: '关于发货'})
  aboutDelivery: string;

  @Column({comment: '关于退货'})
  aboutReturn: string;

  @Column({comment: '注意事项'})
  attentionNote: string;

  @Column({comment: '上架时间', nullable: true})
  publishTime: Date;

  @Column({comment: '状态 1： 上架 0：下架', default: 0})
  status: number;
}
