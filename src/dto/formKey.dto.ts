import { IsString, IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FormKeyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  formKey: string;
}
