import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  constructor(category: any) {
    this.id = category.id;
    this.categoryName = category.categoryName;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  categoryName: string;
}
