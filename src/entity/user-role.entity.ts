import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

@Entity({name: 'user-role'})
export class UserRoleEntity extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  userId: string;

  @Column()
  @ApiProperty()
  roleId: string;
}
