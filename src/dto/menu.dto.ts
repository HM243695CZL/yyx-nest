import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MenuDto {
  constructor(menu: any) {
    this.id = menu.id;
    this.title = menu.title;
    this.path = menu.path;
    this.icon = menu.icon;
    this.type = menu.type;
    this.sortNum = menu.sortNum;
    this.parentId = menu.parentId;
    this.hidden = menu.hidden;
  }


  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  path: string;

  @ApiProperty()
  @IsNotEmpty()
  icon: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  type: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sortNum: number;

  @ApiProperty()
  parentId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  hidden: number;
}
