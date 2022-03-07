import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FormGeneratorDto {
  constructor(formGenerator: FormGeneratorDto) {
    this.id = formGenerator.id;
    this.formKey = formGenerator.formKey;
    this.name = formGenerator.name;
    this.remark = formGenerator.remark;
    this.configData = formGenerator.configData;
    this.screenShot = formGenerator.screenShot;
  }


  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  formKey: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  remark: string;

  @ApiProperty()
  @IsNotEmpty()
  configData: string;

  @ApiProperty()
  screenShot: string;
}
