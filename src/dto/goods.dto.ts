import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GoodsDto {
  constructor(goods: any) {
    this.id = goods.id;
    this.title = goods.title;
    this.originPrice = goods.originPrice;
    this.sellPriceStart = goods.sellPriceStart;
    this.sellPriceEnd = goods.sellPriceEnd;
    this.categoryId = goods.categoryId;
    this.stock = goods.stock;
    this.sellCount = goods.sellCount;
    this.deliveryTime = goods.deliveryTime;
    this.coverImgId = goods.coverImgId;
    this.freeShopping = goods.freeShopping;
    this.aboutGoods = goods.aboutGoods;
    this.aboutDelivery = goods.aboutDelivery;
    this.aboutReturn = goods.aboutReturn;
    this.status = goods.status;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  originPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sellPriceStart: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sellPriceEnd: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sellCount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  deliveryTime: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  coverImgId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  freeShopping: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  aboutGoods: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  aboutDelivery: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  aboutReturn: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  status: number;
}

export class GoodsGoodsArgsDto {

  constructor(param: any) {
    this.id = param.id;
    this.goodsId = param.id;
    this.goodsArgsId = param.goodsArgsId;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  goodsId: string;

  @ApiProperty()
  @IsString()
  goodsArgsId: string;
}

export class GoodsCarouselDto {

  constructor(param: any) {
    this.id = param.id;
    this.goodsId = param.goodsId;
    this.carouselId = param.carouselId;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  goodsId: string;

  @ApiProperty()
  @IsString()
  carouselId: string;
}
