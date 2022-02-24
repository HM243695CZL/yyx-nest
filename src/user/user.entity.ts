import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UploadEntity } from '../upload/upload.entity';

@Entity({name: 'user'})
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20})
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @OneToOne(() => UploadEntity)
  @JoinColumn()
  userImg: UploadEntity;

  @Column()
  status: boolean;

  @Column()
  createdTime: Date;

  @Column()
  lastModifiedTime: Date;

}
