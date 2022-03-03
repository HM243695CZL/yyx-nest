import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  constructor(login: any) {
    this.username = login.username;
    this.password = login.password;
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
