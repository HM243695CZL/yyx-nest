import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { nanoid } from 'nanoid';
import {v4 as uuidv4} from 'uuid';
import { CommonService } from './common.service';
import { byte2Size } from '../../utils/tools';


@ApiTags('公共接口')
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService){}

  @Post('upload/one')
  @ApiOperation({summary: '上传单个文件'})
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file')) // file 表示上传文件的字段名
  async uploadOne(@UploadedFile() file, @Body() body) {
    // body 为FormData中的其他非文件参数
    const newFileName = nanoid() + '.' + file.originalname.split('.')[1];
    const fileStream = createWriteStream(join(__dirname, '../../../public', `${newFileName}`));
    fileStream.write(file.buffer);
    const obj = {
      id: uuidv4(),
      originFileName: file.originalname,
      newFileName,
      size: byte2Size(file.size)
    };
    return await this.commonService.createOne(obj);
  }

  @Post('upload/more')
  @ApiOperation({summary: '上传文件数组'})
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMore(@UploadedFiles() files, @Body() body) {
    let arr = [];
    for (const file of files) {
      const newFileName = nanoid() + '.' + file.originalname.split('.')[1];
      const fileStream = createWriteStream(join(__dirname, '../../../public', `${newFileName}`));
      fileStream.write(file.buffer);
      arr.push({
        id: uuidv4(),
        originFileName: file.originalname,
        newFileName,
        size: byte2Size(file.size)
      });
    }
    return await this.commonService.createMore(arr);
  }
}
