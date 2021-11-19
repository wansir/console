import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import qs from 'qs';
import { set, merge } from 'lodash';
import { urlHelper } from './';
import { GlobalMessage } from '../types';

const { getClusterUrl } = urlHelper;

function getRequestUrl(url: string = '') {
  if (url.startsWith('http')) return url;
  const formatUrl = url.startsWith('http') ? url : `/${url.trimLeft()}`;
  return getClusterUrl(formatUrl);
}

function formatError(response: AxiosResponse): GlobalMessage {
  const { data, status } = response;
  return {
    status,
    reason: data.reason,
    message: data.message,
  };
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
    return response.data;
  },
  error => {
    const msg = formatError(error.response);
    globals.emitter.emit('globalMsg', msg);
    console.warn(error);
    return Promise.reject(error);
  },
);

export default axios;
