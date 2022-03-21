import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { UploadEntity } from '../../entity/upload.entity';
import { success } from '../../common/res-status';
import { ResponseMessageEnum } from '../../enum/response.message.enum';


@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(UploadEntity)
    private uploadRepository: Repository<UploadEntity>
  ) {}

  /**
   * 保存上传的一个文件
   * @param data
   */
  async createOne(data) {
    data.createdTime = new Date();
    data.lastModifiedTime = new Date();
    const {id} = await this.uploadRepository.save(data);
    if (id) {
      return success(await this.getFileInfoById(id), ResponseMessageEnum.UPLOAD_SUCCESS);
    } else {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.UPLOAD_FAIL
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 保存上传的多个文件
   * @param fileArr
   */
  async createMore(fileArr) {
    const arr = [];
    for (let i = 0; i < fileArr.length; i++) {
      arr.push({
        ...fileArr[i],
        createdTime: new Date(),
        lastModifiedTime: new Date()
      })
    }
    const files = await this.uploadRepository.save(arr);
    if (files.length === fileArr.length) {
      const resArrId = [];
      files.map(item => {
        resArrId.push(item.id);
      });
      return success(await this.getFileInfoByIdArr(resArrId), ResponseMessageEnum.UPLOAD_SUCCESS);
    } else {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ResponseMessageEnum.UPLOAD_FAIL
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 根据id获取上传的文件信息
   * @param id
   */
  async getFileInfoById(id) {
    const data = await this.uploadRepository.findOne({id});
    const { size, originFileName, newFileName} = data;
    return {
      size,
      originFileName,
      newFileName,
      id
    }
  }

  /**
   * 根据数组id获取上传的文件信息
   * @param arrId
   */
  async getFileInfoByIdArr(arrId) {
    const data = await this.uploadRepository.find(arrId);
    const arr = [];
    data.map(item => {
      const { size, originFileName, newFileName, id } = item;
      arr.push({
        size,
        originFileName,
        newFileName,
        id
      });
    });
    return arr;
  }
}
