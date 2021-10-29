import { isEmpty } from 'lodash';

export default function loader(plugins: string[]) {
  const promises: Promise<System.Module>[] = [];
  if (!isEmpty(plugins)) {
    plugins.forEach(plugin => {
      const filePath = `${window.location.origin}/public/plugins/${plugin}/dist/index.js`;
      promises.push(System.import(filePath));
    });
  }

  return Promise.allSettled(promises);
}
