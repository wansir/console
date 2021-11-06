import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import plugins from './plugins';
import loader from './libs/loader';
import i18n from './libs/i18n';

const LoadingComponent = () => <div>Loading</div>;

const run = async () => {
  if (process.env.NODE_ENV === 'production') {
    // load remote plugin
    await loader(globals.installedPlugins);
  }
  await i18n.init();
  // load local plugin
  globals.context.registerPlugins(plugins);

  ReactDOM.render(
    <Suspense fallback={LoadingComponent}>
      <App />
    </Suspense>,
    document.getElementById('root'),
  );
};

export default run;
