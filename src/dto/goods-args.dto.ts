import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator';

export class GoodsArgsDto {
  constructor(goodsArgs: any) {
    this.id = goodsArgs.id;
    this.argsName = goodsArgs.argsName;
    this.argsValue = goodsArgs.argsValue;
  }


  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  argsName: string;

  @ApiProperty()
  @IsNotEmpty()
  argsValue: string;
}
