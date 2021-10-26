module.exports = {
  packageScope: '@ks-plugin',
  packageJson: {
    homepage: '',
    main: 'lib/index.js',
    files: ['lib'],
    scripts: {
      build: 'webpack --config ../../scripts/webpack.plugin.conf.js --output-path ./dist',
    },
    dependencies: []
  },
  readme: pluginName => `
## ${pluginName}
> TODO: description
  `,
  indexTemplate: (pluginName, displayName) =>
`import routes from './routes';

const pluginConfig = {
  nav: {
    path: '/${pluginName}',
    title: '${displayName}',
  },
  routes,
};
globals.context.registerPlugin(pluginConfig);
`,
  appTemplate: pluginName =>
`import React from 'react';

export default function App() {
  return <h3 style={{ margin: '8rem auto', textAlign: 'center' }}>This is ${pluginName} plugin</h3>;
}
`,
  routeTemplate: indexRoute =>
`import App from '../App';

export default [
  {
    path: '/${indexRoute}',
    component: App,
    exact: true,
  },
];
`,
  iconTemplate: `
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff" style="background-color:#1e1f26">
<path d="M24 7.6c0-.3 0-.5-.4-.6C12.2.2 12.4-.3 11.6 0 3 5.5.6 6.7.2 7.1c-.3.3-.2.8-.2 8.3 0 .9 7.7 5.5 11.5 8.4.4.3.8.2 1 0 11.2-8 11.5-7.6 11.5-8.4V7.6zm-1.5 6.5l-3.9-2.4L22.5 9zm-5.3-3.2l-4.5-2.7V2L22 7.6zM12 14.5l-3.9-2.7L12 9.5l3.9 2.3zm-.8-12.4v6L6.8 11 2.1 7.6zm-5.8 9.6l-3.9 2.4V9zm1.3 1l4.5 3.1v6l-9-6.3zm6 9.1v-6l4.6-3.1 4.6 2.8z"></path></svg>  
`,
};
