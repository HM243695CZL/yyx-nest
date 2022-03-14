import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator';

export class RoleDto {
  constructor(role: any) {
    this.id = role.id;
    this.name = role.name;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
