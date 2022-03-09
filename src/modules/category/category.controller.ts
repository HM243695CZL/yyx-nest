import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { PageEntity } from '../../entity/page.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CategoryDto } from '../../dto/category.dto';
import { CommonDto } from '../../dto/common.dto';

@ApiTags('分类管理')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Get('list')
  @ApiOperation({summary: '获取所有分类'})
  async list() {
    return await this.categoryService.list();
  }

  @Post('page')
  @ApiOperation({summary: '分页'})
  async page(@Body() page: PageEntity): Promise<any> {
    return await this.categoryService.page(page);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({summary: '新增分类'})
  async create(@Body() category: CategoryDto, @Request() req): Promise<any> {
    return await this.categoryService.create(category, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @ApiOperation({summary: '更新分类'})
  async update(@Body() category: CategoryDto, @Request() req): Promise<any> {
    return await this.categoryService.update(category, req.user);
  }

  @Get('view')
  @ApiOperation({summary: '查看分类'})
  async view(@Query() id: CommonDto): Promise<any> {
    return await this.categoryService.view(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('delete')
  @ApiOperation({summary: '删除分类'})
  async delete(@Query() id: CommonDto): Promise<any> {
    return await this.categoryService.delete(id);
  }
}
