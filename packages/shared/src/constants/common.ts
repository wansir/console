export const API_VERSIONS = {
  users: 'apis/iam.kubesphere.io/v1alpha2',
  globalroles: 'apis/iam.kubesphere.io/v1alpha2',
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
