import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FormGeneratorService } from './form-generator.service';
import { PageEntity } from '../../entity/page.entity';
import { FormGeneratorDto } from '../../dto/formGenerator.dto';
import { CommonDto } from '../../dto/common.dto';
import { FormKeyDto } from '../../dto/formKey.dto';

@ApiTags('表单配置')
@Controller('form-config')
export class FormGeneratorController {
  constructor(private readonly formGeneratorService: FormGeneratorService){}

  @Post('page')
  @ApiOperation({summary: '分页'})
  async page(@Body() page: PageEntity): Promise<any> {
    return await this.formGeneratorService.page(page);
  }

  @Post('create')
  @ApiOperation({summary: '新增表单配置'})
  async create(@Body() formGenerator: FormGeneratorDto): Promise<any> {
    return await this.formGeneratorService.create(formGenerator);
  }

  @Post('update')
  @ApiOperation({summary: '更新表单配置'})
  async update(@Body() formGenerator: FormGeneratorDto): Promise<any> {
    return await this.formGeneratorService.update(formGenerator);
  }

  @Get('view')
  @ApiOperation({summary: '查看表单配置'})
  async view(@Param() formKey: FormKeyDto): Promise<any> {
    return await this.formGeneratorService.view(formKey);
  }

  @Get('delete')
  @ApiOperation({summary: '删除表单配置'})
  async delete(@Query() id: CommonDto): Promise<any> {
    return await this.formGeneratorService.delete(id);
  }
}
