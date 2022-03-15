import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RepositoryService } from './repository.service';
import { PageEntity } from '../entity/page.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommonDto } from '../dto/common.dto';

@Controller()
export class BaseController {
  constructor(
    // @ts-ignore
    private readonly repositoryService: RepositoryService
  ){}

  @Get('list')
  @ApiOperation({summary: '获取所有列表数据'})
  async list() {
    return await this.repositoryService.list();
  }

  @Post('page')
  @ApiOperation({summary: '分页'})
  async page(@Body() page: PageEntity): Promise<any> {
    return await this.repositoryService.page(page);
  }

  @Get('view')
  @ApiOperation({summary: '查看数据'})
  async view(@Query() id: CommonDto): Promise<any> {
    return await this.repositoryService.view(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('delete')
  @ApiOperation({summary: '删除数据'})
  async delete(@Query() id: CommonDto): Promise<any> {
    return await this.repositoryService.delete(id);
  }
}
