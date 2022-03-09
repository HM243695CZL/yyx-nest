import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FormGeneratorService } from './form-generator.service';
import { PageEntity } from '../../entity/page.entity';
import { FormGeneratorDto } from '../../dto/formGenerator.dto';
import { CommonDto } from '../../dto/common.dto';
import { FormKeyDto } from '../../dto/formKey.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('表单配置')
@Controller('form-config')
export class FormGeneratorController {
  constructor(private readonly formGeneratorService: FormGeneratorService){}

  @UseGuards(JwtAuthGuard)
  @Post('page')
  @ApiOperation({summary: '分页'})
  async page(@Body() page: PageEntity): Promise<any> {
    return await this.formGeneratorService.page(page);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({summary: '新增表单配置'})
  async create(@Body() formGenerator: FormGeneratorDto): Promise<any> {
    return await this.formGeneratorService.create(formGenerator);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @ApiOperation({summary: '更新表单配置'})
  async update(@Body() formGenerator: FormGeneratorDto): Promise<any> {
    return await this.formGeneratorService.update(formGenerator);
  }

  @UseGuards(JwtAuthGuard)
  @Get('view')
  @ApiOperation({summary: '查看表单配置'})
  async view(@Query() formKey: FormKeyDto): Promise<any> {
    return await this.formGeneratorService.view(formKey);
  }

  @UseGuards(JwtAuthGuard)
  @Get('delete')
  @ApiOperation({summary: '删除表单配置'})
  async delete(@Query() id: CommonDto): Promise<any> {
    return await this.formGeneratorService.delete(id);
  }
}
