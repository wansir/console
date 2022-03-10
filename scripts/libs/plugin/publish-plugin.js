const { exec } = require('child_process');
const path = require('path');

const pluginsDir = path.resolve(process.cwd(), 'plugins');

async function publishPlugin(pluginName, namespace = 'default') {
  const pluginDir = path.resolve(pluginsDir, pluginName);
  const bundleName = `jsbundle-${pluginName}`;

  const cmd = `
kubectl -n ${namespace} create cm ${bundleName} --from-file=${pluginDir}/dist/index.js

cat << EOF | kubectl apply -f -
apiVersion: extensions.kubesphere.io/v1alpha1
kind: JSBundle
metadata:
  name: ${pluginName}.kubesphere.io
spec:
  rawFrom:
    configMapKeyRef:
      name: ${bundleName}
      key: index.js
      namespace: ${namespace}
status:
  enabled: true
  link: /dist/${pluginName}.kubesphere.io/v1alpha2/index.js
EOF
  `;

  // console.log(cmd);
  const process = exec(cmd);
  process.stdout.on('data', data => {
    console.log(data);
  });
}

module.exports = publishPlugin;
