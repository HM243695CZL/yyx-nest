import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator';

export class GoodsArgsDto {
  constructor(goodsArgs: any) {
    this.id = goodsArgs.id;
    this.argsCnName = goodsArgs.argsCnName;
    this.argsEnName = goodsArgs.argsEnName;
  }


  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  argsCnName: string;

  @ApiProperty()
  @IsNotEmpty()
  argsEnName: string;
}
