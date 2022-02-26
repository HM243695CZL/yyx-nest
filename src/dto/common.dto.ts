import { IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommonDto {
  @ApiProperty()
  @IsString()
  id: string;
}
