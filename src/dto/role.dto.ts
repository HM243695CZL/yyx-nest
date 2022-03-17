import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator';

export class RoleDto {
  constructor(role: any) {
    this.id = role.id;
    this.name = role.name;
    this.remark = role.remark;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  remark: string;
}

export class RoleMenuDto {

  @ApiProperty()
  id: number;

  @ApiProperty()
  menus: []
}
