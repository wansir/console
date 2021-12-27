export const API_VERSIONS: Record<string, string> = {
  users: 'apis/iam.kubesphere.io/v1alpha2',
  globalroles: 'apis/iam.kubesphere.io/v1alpha2',
};

export const COMPONENT_ICON_MAP: Record<string, string> = {
  kubernetes: 'kubernetes',
  kubesphere: 'kubesphere',
  istio: 'istio',
  openpitrix: 'openpitrix',
  devops: 'jenkins',
  logging: 'record',
  monitoring: 'monitor',
  alerting: 'loudspeaker',
  auditing: 'login-servers',
  events: 'thunder',
  notification: 'mail',
  servicemesh: 'istio',
  metrics_server: 'monitor',
};

export const CLUSTER_PROVIDER_ICON: Record<string, string> = {
  'Aliyun ACK': 'aliyun',
  'Azure Kubernetes Service': 'windows',
  'Huawei Cloud CCE': 'kubernetes',
  'Amazon EKS': 'aws',
  'Google Kubernetes Engine': 'google-plus',
  'QingCloud Kubernetes Engine': 'qingcloud',
  'Tencent Kubernetes Engine': 'kubernetes',
  kubesphere: 'kubernetes',
};

export const CLUSTER_PROVIDERS = [
  {
    label: 'Alibaba Cloud ACK',
    value: 'Aliyun ACK',
    icon: 'aliyun',
  },
  {
    label: 'Azure Kubernetes Service',
    value: 'Aure Kubernetes Service',
    icon: 'windows',
  },
  {
    label: 'Huawei Cloud CCE',
    value: 'Huawei Cloud CCE',
    icon: 'kubernetes',
  },
  {
    label: 'Amazon EKS',
    value: 'Amazon EKS',
    icon: 'aws',
  },
  {
    label: 'Google Kubernetes Engine',
    value: 'Google Kubernetes Engine',
    icon: 'google-plus',
  },
  {
    label: 'QingCloud Kubernetes Engine',
    value: 'QingCloud Kubernetes Engine',
    icon: 'qingcloud',
  },
  {
    label: 'Tencent Kubernetes Engine',
    value: 'Tencent Kubernetes Engine',
    icon: 'kubernetes',
  },
];

export const CLUSTER_PRESET_GROUPS = [
  {
    label: 'production',
    value: 'production',
  },
  {
    label: 'development',
    value: 'development',
  },
  {
    label: 'testing',
    value: 'testing',
  },
  {
    label: 'demo',
    value: 'demo',
  },
];

export const CLUSTER_GROUP_TAG_TYPE: Record<string, string> = {
  production: 'warning',
  development: 'default',
  testing: 'info',
  demo: 'primary',
};

export const DEFAULT_CLUSTER = {
  apiVersion: 'cluster.kubesphere.io/v1alpha1',
  kind: 'Cluster',
  metadata: {
    annotations: {
      'cluster.kubesphere.io/is-host-cluster': 'true',
    },
    labels: {
      'cluster.kubesphere.io/visibility': 'public',
    },
    name: globals?.config?.defaultClusterName || 'default',
  },
};
