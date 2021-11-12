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

/**
 * parse string without error throw.
 * @param {string} json - json string need to be parsed
 * @param {object} defaultValue - if parse failed, return defaultValue
 */
export const safeParseJSON = (
  json: string,
  defaultValue?: Record<string, any>,
): Record<string, any> => {
  let result;
  try {
    result = JSON.parse(json);
  } catch (e) {}

  if (!result && defaultValue !== undefined) {
    return defaultValue;
  }
  return result;
};

export const getClusterUrl = (url: string): string => {
  let requestURL = url;

  const reg = new RegExp(/\/(api|apis|kapis)\/(.*)\/?(klusters\/[^/]*)\/(.*)/);
  const match = requestURL.match(reg);

  if (match && match.length === 5) {
    requestURL = globals.app.isMultiCluster
      ? `/${match[1]}/${match[3].replace('klusters', 'clusters')}/${match[2]}/${match[4]}`
      : `/${match[1]}/${match[2]}/${match[4]}`;
  }

  return requestURL.replace(/\/\/+/, '/');
};
