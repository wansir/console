import { get, set, uniq, isArray, intersection } from 'lodash';
import { getPath } from './urlHelper';
import request from './request';
import { PathParams } from '../types';
import { safeParseJSON } from './parser';
import { getActions } from './nav';

export const getUserModule = ({ cluster, workspace, namespace, devops }: PathParams = {}) => {
  if (namespace || devops) {
    return 'members';
  }

  if (workspace) {
    return 'workspacemembers';
  }

  if (cluster) {
    return 'clustermembers';
  }

  return 'users';
};

export const fetchRules = async (params: PathParams) => {
  let module = 'globalroles';
  if (params.namespace || params.devops) {
    module = 'roles';
  } else if (params.workspace) {
    module = 'workspaceroles';
  } else if (params.cluster) {
    module = 'clusterroles';
  }

  const url = `kapis/iam.kubesphere.io/v1alpha2${getPath(params)}/${getUserModule(params)}/${
    params.name
  }/${module}`;
  const resp = await request.get<any, any[]>(url);

  let rules: Record<string, any> = {};
  if (resp) {
    resp.forEach(item => {
      const rule = safeParseJSON(
        get(item, "metadata.annotations['iam.kubesphere.io/role-template-rules']"),
        {},
      );

      Object.keys(rule).forEach(key => {
        rules[key] = rules[key] || [];
        if (isArray(rule[key])) {
          rules[key].push(...rule[key]);
        } else {
          rules[key].push(rule[key]);
        }
        rules[key] = uniq(rules[key]);
      });
    });
  }

  switch (module) {
    case 'globaleroles':
      set(globals.user, 'globalRules', rules);
      break;
    case 'clusterroles': {
      const parentActions = getActions({ module: 'clusters' });
      set(globals.user, `clusterRules[${params.cluster}]`, {
        ...rules,
        _: intersection(parentActions, ['view', 'manage']),
      });
      break;
    }
    case 'workspaceroles': {
      if (params.workspace === globals.config.systemWorkspace) {
        set(globals.user, `workspaceRules[${params.workspace}]`, {
          ...globals.config.systemWorkspaceRules,
        });
        break;
      }

      const parentActions = getActions({ module: 'workspaces' });
      set(globals.user, `workspaceRules[${params.workspace}]`, {
        ...rules,
        _: intersection(parentActions, ['view', 'manage']),
      });
      break;
    }
    case 'roles': {
      const obj: Record<string, any> = {};
      if (params.workspace) {
        obj.workspace = params.workspace;
      } else if (params.cluster) {
        obj.cluster = params.cluster;
      }

      if (params.namespace) {
        const parentActions = getActions({
          ...obj,
          module: 'projects',
        });

        if (params.workspace === globals.config.systemWorkspace) {
          rules = globals.config.systemWorkspaceProjectRules;
        }

        set(globals.user, `projectRules[${params.cluster}][${params.namespace}]`, {
          ...rules,
          _: intersection(parentActions, ['view', 'manage']),
        });
      } else if (params.devops) {
        const parentActions = getActions({
          ...obj,
          module: 'devops',
        });

        set(globals.user, `devopsRules[${params.cluster}][${params.devops}]`, {
          ...rules,
          _: intersection(parentActions, ['view', 'manage']),
        });
      }
      break;
    }
    default:
  }
};
