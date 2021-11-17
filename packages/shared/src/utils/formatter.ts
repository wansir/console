/**
 * format size, output the value with unit
 * @param {Number} size - the number need to be format
 */
export const formatSize = (size: number): string => {
  const divisor = 1024;
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];

  let index = 0;
  while (size >= divisor && index < units.length) {
    size = parseFloat((size / divisor).toFixed(2));
    index += 1;
  }

  return `${size} ${units[index]}`;
};
