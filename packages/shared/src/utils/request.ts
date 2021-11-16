import axios, { AxiosRequestConfig } from 'axios';
// import qs from 'qs';
import { set, merge } from 'lodash';
import { getClusterUrl } from './string';

function getRequestUrl(url: string = '') {
  if (url.startsWith('http')) return url;
  const formatUrl = url.startsWith('http') ? url : `/${url.trimLeft()}`;
  return getClusterUrl(formatUrl);
}

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.url = getRequestUrl(config.url);

  if (config.method?.toUpperCase() === 'POST' && config.data.metadata) {
    set(config.data, 'metadata.annotations["kubesphere.io/creator"]', globals.user.username);
  }

  if (config.headers) {
    config.headers = merge(
      {
        'content-type':
          config.method?.toUpperCase() === 'PATCH'
            ? 'application/merge-patch+json'
            : 'application/json',
      },
      config.headers,
    );
  }

  return config;
}, Promise.reject);

axios.interceptors.response.use(
  response => {
    console.log(response);
    if (response.statusText === 'OK' && response.status >= 200 && response.status < 400) {
      return response.data;
    }

    // handle other situation
    if (response.status === 401) {
      console.warn('Unauthorized', response.data);
    }

    return response.data;
  },
  error => {
    console.warn(error);
    return Promise.reject(error);
  },
);

export default axios;
