const get = require('lodash/get');
const { sendGatewayRequest } = require('../libs/request');

const getInstalledPlugins = async ctx => {
  try {
    const url = '/apis/extensions.kubesphere.io/v1alpha1/jsbundles';
    const plugins = await sendGatewayRequest({
      method: 'GET',
      url,
      token: ctx.cookies.get('token'),
    });

    const installedPlugins = [];
    if (Array.isArray(plugins?.items)) {
      plugins.items.forEach(item => {
        const name = get(item, 'metadata.name');
        const { link, enabled } = item.status;
        if (enabled) {
          installedPlugins.push({
            name,
            link,
          });
        }
      });
    }
    return installedPlugins;
  } catch (error) {
    return [];
  }
};

module.exports = {
  getInstalledPlugins,
};
