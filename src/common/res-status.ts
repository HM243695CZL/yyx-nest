/**
 * 成功函数
 * @param datas 数据
 * @param message 提示信息
 * @param code 标识码
 */
export function success(datas, message, code = 200) {
  return {
    datas,
    message,
    code
  }
}

/**
 * 失败函数
 * @param datas 数据
 * @param message 提示信息
 * @param code 标识码
 */
export function fail(datas, message, code = 500) {
  return {
    datas,
    message,
    code
  }
}
