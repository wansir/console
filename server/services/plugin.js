const get = require('lodash/get');
const { sendGatewayRequest } = require('../libs/request');

const getInstalledExtensions = async ctx => {
  try {
    const url = '/apis/extensions.kubesphere.io/v1alpha1/jsbundles';
    const extensions = await sendGatewayRequest({
      method: 'GET',
      url,
      token: ctx.cookies.get('token'),
    });

    const installedExtensions = [];
    if (Array.isArray(extensions?.items)) {
      extensions.items.forEach(item => {
        const name = get(item, 'metadata.name');
        const { link, state } = item.status;
        if (state === 'Available') {
          installedExtensions.push({
            name,
            link,
          });
        }
      });
    }
    return installedExtensions;
  } catch (error) {
    return [];
  }
};

module.exports = {
  getInstalledExtensions,
};
