import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator';

export class IconDto {
  constructor(icon: any) {
    this.id = icon.id;
    this.iconName = icon.iconName;
  }


  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  iconName: string;
}
