import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CategoryDto } from '../../dto/category.dto';
import { BaseController } from '../../common/base.controller';

@ApiTags('分类管理')
@Controller('category')
export class CategoryController extends BaseController{
  constructor(
    private readonly categoryService: CategoryService
  ) {
    super(categoryService);
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
}
