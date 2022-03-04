import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { UploadEntity } from '../../entity/upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadEntity])],
  providers: [CommonService],
  controllers: [CommonController],
  exports: [CommonService]
})
export class CommonModule {}
