import { isEmpty, get } from 'lodash';

export const fillEmptyMetrics = (params: Record<string, any>, result: Record<string, any>) => {
  if (!params.times || !params.start || !params.end) {
    return result;
  }

  const format = (num: number) => String(num).replace(/\..*$/, '');
  const step = Math.floor((params.end - params.start) / params.times);
  const correctCount = params.times + 1;

  Object.values(result).forEach(item => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const _result: any[] = get(item, 'data.result');
    if (!isEmpty(_result)) {
      _result.forEach(resultItem => {
        const curValues: any[] = resultItem.values || [];
        const curValuesMap = curValues.reduce(
          (prev, cur) => ({
            ...prev,
            [format(cur[0])]: cur[1],
          }),
          {},
        );

        if (curValues.length < correctCount) {
          const newValues = [];
          for (let index = 0; index < correctCount; index++) {
            const time = format(params.start + index * step);
            newValues.push([time, curValuesMap[time] || '0']);
          }
          resultItem.values = newValues;
        }
      });
    }
  });

  return result;
};
