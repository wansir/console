import { isEmpty } from 'lodash';

export default function loader(plugins: string[]) {
  const promises: Promise<System.Module>[] = [];
  if (!isEmpty(plugins)) {
    plugins.forEach(plugin => {
      const { link } = plugin;
      console.log('link', link);
      promises.push(System.import(`/pstatic${link}`));
    });
  }

  return Promise.allSettled(promises);
}
