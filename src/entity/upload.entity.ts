import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'upload'})
export class UploadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originFileName: string;

  @Column()
  newFileName: string;

  @Column({select: false})
  createdTime: Date;

  @Column({select: false})
  lastModifiedTime: Date;
}
