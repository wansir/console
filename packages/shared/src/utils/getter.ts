export const getClusterUrl = (url: string): string => {
  let requestURL = url;

  const reg = new RegExp(/\/(api|apis|kapis)\/(.*)\/?(klusters\/[^/]*)\/(.*)/);
  const match = requestURL.match(reg);

  if (match && match.length === 5) {
    requestURL = globals.app.isMultiCluster
      ? `/${match[1]}/${match[3].replace('klusters', 'clusters')}/${match[2]}/${match[4]}`
      : `/${match[1]}/${match[2]}/${match[4]}`;
  }

  return requestURL.replace(/\/\/+/, '/');
};
