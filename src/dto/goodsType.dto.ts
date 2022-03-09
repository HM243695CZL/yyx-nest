import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator';

export class GoodsTypeDto {
  constructor(goodsType: any) {
    this.id = goodsType.id;
    this.typeName = goodsType.typeName;
  }


  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  typeName: string;
}
