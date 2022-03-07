import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name: 'form-generator'})
export class FormGeneratorEntity {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({length: 20, comment: '表单的key', unique: true})
  formKey: string;

  @Column({ comment: '表单名称'})
  name: string;

  @Column({comment: '备注', nullable: true})
  remark: string;

  @Column({comment: '配置数据', type: 'text'})
  configData: string;

  @Column({comment: '配置缩略图', type: 'text', nullable: true})
  screenShot: string;

  @CreateDateColumn({comment: '创建时间'})
  createdTime: Date;

  @UpdateDateColumn({comment: '更新时间'})
  lastModifiedTime: Date;
}
