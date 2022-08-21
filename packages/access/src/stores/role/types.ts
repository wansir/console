interface OriginalRole {
  apiVersion?: string;
  kind?: string;
  metadata: {
    name: string;
    uid: string;
    resourceVersion: string;
    generation: number;
    creationTimestamp: string;
    annotations: {
      'iam.kubesphere.io/aggregation-roles': string;
      'kubesphere.io/alias-name'?: string;
      'kubectl.kubernetes.io/last-applied-configuration'?: string;
      'kubesphere.io/creator': string;
      'kubesphere.io/description'?: string;
    };
    managedFields: {
      manager: string;
      operation: string;
      apiVersion: string;
      time: string;
      fieldsType: string;
      fieldsV1: {
        'f:metadata': {
          'f:annotations': {
            '.': {};
            'f:iam.kubesphere.io/aggregation-roles': {};
            'f:kubesphere.io/creator': {};
          };
        };
      };
    }[];
  };
  rules: { verbs: string[]; apiGroups: string[]; resources: string[] }[];
}

type FormatRoleKind =
  | 'workspaceroles'
  | 'globalroles'
  | 'clusterroles'
  | 'roles'
  | 'devopsroles'
  | string;

export type { OriginalRole, FormatRoleKind };
