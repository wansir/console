import { request, useList } from '@ks-console/shared';
import { useQuery, useMutation } from 'react-query';
import { get } from 'lodash';

const getBaseInfo = (item: any) => {
  const versions: any[] = get(item, 'status.versions');
  const crtVersion = versions[versions.length - 1];
  return {
    uid: get(item, 'metadata.uid'),
    name: get(item, 'metadata.name'),
    resourceVersion: get(item, 'metadata.resourceVersion'),
    description: get(crtVersion, 'description'),
    icon: get(crtVersion, 'icon'),
    keywords: get(crtVersion, 'keywords', []),
    maintainers: get(crtVersion, 'maintainers'),
  };
};

const componentMapper = (item: any) => {
  return {
    ...getBaseInfo(item),
    version: get(item, 'status.currentVersion'),
    status: get(item, 'status.phase'),
    versions: get(item, 'status.versions', []),
    _originData: item,
  };
};

export const useFetchCategories = () => {
  const url = 'apis/extensions.kubesphere.io/v1alpha1/categories';
  return useQuery(['component-categories'], async () => {
    const data = await request(url);
    return data as any;
  });
};

export const useFetchComponents = (params: Record<string, any>) => {
  const url = 'apis/extensions.kubesphere.io/v1alpha1/plugins';

  return useList({ url, params, format: componentMapper });
};

export const useFetchComponent = (name: string) => {
  const url = `apis/extensions.kubesphere.io/v1alpha1/plugins/${name}/`;
  return useQuery(['component', name], async () => {
    const data = await request(url);
    return componentMapper(data);
  });
};

export const useFetchFile = (name: string, version: string, file: string) => {
  const url = `apis/packages.extensions.kubesphere.io/v1alpha1/pluginversions/${name}-v${version}/files`;
  const params = { name: file };
  return useQuery(
    ['component-file', name, version, file],
    async () => {
      const data = await request(url, { params });
      return data as any;
    },
    {
      enabled: !!version,
      staleTime: 15000,
    },
  );
};

export const useFetchFileNames = (name: string, version: string, invoke: boolean) => {
  const url = `apis/packages.extensions.kubesphere.io/v1alpha1/pluginversions/${name}-v${version}/files`;
  return useQuery(
    ['component-file', name, version],
    async () => {
      const data = await request(url);
      return data as any;
    },
    {
      enabled: !!version && invoke,
      staleTime: 15000,
    },
  );
};

export const useFetchSubscriptions = (name: string) => {
  const url = `apis/extensions.kubesphere.io/v1alpha1/subscriptions/${name}`;
  return useQuery(
    ['Subscriptions', name],
    async () => {
      const data = await request(url);
      return data as any;
    },
    {
      staleTime: 15000,
    },
  );
};

export const useSubscriptionMutation = (name: string) => {
  const url = `apis/extensions.kubesphere.io/v1alpha1/subscriptions/${name}`;
  return useMutation(data => {
    return request.put(url, data);
  });
};
