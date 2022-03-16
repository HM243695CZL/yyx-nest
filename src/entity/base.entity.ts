import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @CreateDateColumn({comment: '创建时间'})
  @ApiProperty()
  createdTime: Date;

  @UpdateDateColumn({comment: '更新时间'})
  @ApiProperty()
  lastModifiedTime: Date;
}
