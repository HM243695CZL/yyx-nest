/**
 * 字节转换
 * @param byte
 */
export function byte2Size(byte) {
  if (byte === 0) return '0 B';
  let k = 1024;
  const size = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(byte) / Math.log(k));
  return (byte / Math.pow(k, i)).toFixed(1) + ' ' + size[i];
}
