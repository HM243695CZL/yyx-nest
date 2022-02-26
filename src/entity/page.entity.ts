import { ApiProperty } from '@nestjs/swagger';
/**
 * 分页对象
 */
export class PageEntity {
  /**
   *第几页
   */
  @ApiProperty({ default: 1})
  first: number;

  /**
   * 每页几条
   */
  @ApiProperty({ default: 10})
  rows: number;

  /**
   * 总记录数
   */
  @ApiProperty({ default: 1})
  totalRecords: number;

  /**
   * 过滤字段
   */
  @ApiProperty()
  filters: any = {};

  /**
   * 排序字段
   */
  @ApiProperty({ default: []})
  multiSortMeta: Array<SortMeta> = [];
}

class SortMeta {
  field: string;
  order = 1;
}
