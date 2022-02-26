import { strategyObj } from './strategyObj';

/**
 * 根据参数构造查询条件
 * @param params
 */
export const createQueryCondition = params => {
  const { first, rows, filters, multiSortMeta } = params;
  const where = filters2where(filters);
  return {
    skip: rows * (first - 1),
    take: rows,
    ...where
  }
};


/**
 * 将前端传递过来的 filters 字段转为where条件需要的格式
 * @param filters
 */
export const filters2where = filters => {
  let obj = {};
  for (const o in filters) {
    obj[o] = strategyObj[filters[o].matchMode](filters[o].value);
  }
  return obj;
};
