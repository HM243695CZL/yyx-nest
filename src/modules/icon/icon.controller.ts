import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IconService } from './icon.service';
import { IconDto } from '../../dto/icon.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BaseController } from '../../common/base.controller';

@ApiTags('图标管理')
@Controller('icon')
export class IconController extends BaseController{
  constructor(
    private readonly iconService: IconService,
  ){
    super(iconService);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({summary: '新增图标'})
  async create(@Body() icon: IconDto, @Request() req): Promise<any> {
    return await this.iconService.create(icon, req.user);
  }

}
