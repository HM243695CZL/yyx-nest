import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

@Entity({name: 'goods-carousel'})
export class GoodsCarouselEntity extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  goodsId: string;

  @Column()
  @ApiProperty()
  carouselId: string;
}
