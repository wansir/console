import { get } from 'lodash';

export const getDocsUrl = (module: any) => {
  const { url: prefix } = globals.config.documents;
  const docUrl = get(globals.config, `resourceDocs[${module}]`, '');

  if (!docUrl) {
    return '';
  }

  return `${prefix}${docUrl}`;
};
