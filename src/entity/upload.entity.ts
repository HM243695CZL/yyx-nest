import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'upload'})
export class UploadEntity {
  @PrimaryColumn({
    length: 50
  })
  id: string;

  @Column()
  originFileName: string;

  @Column()
  newFileName: string;

  @Column()
  size: string;

  @Column({select: false})
  createdTime: Date;

  @Column({select: false})
  lastModifiedTime: Date;
}
