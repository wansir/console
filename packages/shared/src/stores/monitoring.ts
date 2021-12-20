import { isEmpty, get, set, isArray } from 'lodash';
import { isMultiCluster } from '../utils/checker';
import { getMinuteValue, getTimeRange, fillEmptyMetrics } from '../utils/monitoring';
import request from '../utils/request';

export const apiVersion = (cluster?: string) => {
  if (isMultiCluster() && cluster) {
    return `kapis/clusters/${cluster}/monitoring.kubesphere.io/v1alpha3`;
  }
  return 'kapis/monitoring.kubesphere.io/v1alpha3';
};

export const getApi = (cluster?: string) => `${apiVersion(cluster)}/cluster`;

export const handleParams = (params: any) => params;

export const getParams = ({
  // @ts-ignore
  start,
  // @ts-ignore
  end,
  step = '600s',
  times = 20,
  resources = [],
  metrics = [],
  last = false, // last time
  ...rest
} = {}) => {
  const params: Record<string, any> = {
    ...rest,
  };

  if (!last) {
    Object.assign(params, {
      start,
      end,
      step: getMinuteValue(step),
      times,
    });

    if (!start || !end) {
      const timeRange = getTimeRange(params);
      params.start = timeRange.start;
      params.end = timeRange.end;
    }
  }

  if (params.start) {
    params.start = Math.floor(params.start);
  }

  if (params.end) {
    params.end = Math.floor(params.end);
  }

  if (!isEmpty(resources)) {
    params.resources_filter = `${resources.join('|')}$`;
  }

  if (!isEmpty(metrics)) {
    params.metrics_filter = `${metrics.join('|')}$`;
  }

  return params;
};

export const getResult = (result: any) => {
  const data: Record<string, any> = {};
  const results = isArray(result) ? result : get(result, 'results', []) || [];

  if (isEmpty(results)) {
    const metricName = get(result, 'metric_name');

    if (metricName) {
      data[metricName] = result;
    }
  } else {
    results.forEach((item: any) => {
      data[item.metric_name] = item;
    });
  }

  return data;
};

export const getNewValues = (origin = [], newValue = []) => {
  const values: any[] = isEmpty(origin) ? [] : [...origin];
  const value = newValue || [];

  if (!isEmpty(value)) {
    if (values.length > 10) {
      values.shift();
    }
    values.push(value);
  }

  return values;
};

export const getNewRefreshedResult = (
  currentResult = [],
  originResult = [],
  resourceName = 'resource_name',
) => {
  const newResult: any[] = [...originResult];

  currentResult.forEach((record: any, index) => {
    const resName = get(record, `metric.${resourceName}`);
    let recordData: Record<string, any> = {};

    if (resName) {
      const originRecord = newResult.find(_record => get(_record, `metric.${resName}`) === resName);

      if (isEmpty(originRecord)) {
        newResult.push(record);
      } else {
        recordData = originRecord;
      }
    } else {
      recordData = newResult[index];
    }

    if (!isEmpty(recordData)) {
      const newValues = getNewValues(recordData.values, record.value);
      set(recordData, 'values', newValues);
    }
  });

  return newResult;
};

export const getRefreshResult = (newData = {}, origin: Record<string, any> = {}) => {
  const data = origin;

  if (isEmpty(data)) {
    return newData;
  }

  Object.values(newData).forEach(item => {
    const key = get(item, 'metric_name');
    const metric = data[key];

    if (metric) {
      const currentResult = get(item, 'data.result') || [];
      const originResult = get(metric, 'data.result', get(metric, 'data.results')) || [];

      set(metric, 'data.result', getNewRefreshedResult(currentResult, originResult));
    }
  });

  return data;
};

export const getMoreResult = (newData = {}, origin: Record<string, any> = {}) => {
  const data = origin;

  if (isEmpty(data)) {
    return newData;
  }

  Object.values(newData).forEach(item => {
    const key = get(item, 'metric_name');
    const metric = data[key];

    if (metric) {
      const originResult = get(metric, 'data.result', get(metric, 'data.results')) || [];
      const currentResult = get(item, 'data.result') || [];

      const newResult = [...originResult, ...currentResult];
      set(metric, 'data.result', newResult);
    }
  });

  return data;
};

// todo, need test
// export const fetchMetrics = async ({
//   autoRefresh = false,
//   more = false,
//   fillZero = true,
//   getParamsFn = getParams,
//   getApiFn = getApi,
//   ...filters
// }) => {
//   let data = {};
//
//   const fetchFn = async () => {
//     if (autoRefresh) {
//       filters.last = true;
//     }
//
//     // @ts-ignore
//     const params = getParamsFn(filters);
//     const api = getApiFn(filters.cluster);
//
//     const response = await request(api, { params });
//
//     let result = getResult(response);
//     if (autoRefresh) {
//       result = getRefreshResult(result, data);
//     }
//     if (more) {
//       result = getMoreResult(result, data);
//     }
//
//     data = fillZero ? fillEmptyMetrics(params, result) : result;
//
//     return result;
//   };
//
//   return fetchFn();
// };

interface MonitorStoreProps {
  getApiFn?: (params: any) => any;
  getParamsFn?: (params: any) => any;
  handleParamsFn?: (params: any) => any;
}

export const useMonitorStore = ({
  getApiFn = getApi,
  handleParamsFn = handleParams,
  getParamsFn = getParams,
}: MonitorStoreProps = {}) => {
  let data = {};

  const fetchMetrics = async ({
    autoRefresh = false,
    more = false,
    fillZero = true,
    ...filters
  }) => {
    if (autoRefresh) {
      filters.last = true;
    }

    // @ts-ignore
    const params = handleParamsFn(getParamsFn(filters));
    const api = getApiFn(filters.cluster);

    const response = await request(api, { params });

    let result = getResult(response);
    if (autoRefresh) {
      result = getRefreshResult(result, data);
    }
    if (more) {
      result = getMoreResult(result, data);
    }

    data = fillZero ? fillEmptyMetrics(params, result) : result;

    return result;
  };

  return { fetchMetrics, getApi: getApiFn, getParams: getParamsFn };
};
