import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UserDto {
  constructor(user: any) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.mobile = user.mobile;
    this.remark = user.remark;
    this.status = user.status;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  roles: [];

  @ApiProperty()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty()
  remark: string;

  @ApiProperty()
  status: number;
}

export class EditPassDto {
  constructor(param: EditPassDto) {
    this.id = param.id;
    this.password = param.password;
  }


  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}
