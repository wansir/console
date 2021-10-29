import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import plugins from './plugins';
import loader from './libs/loader';

const LoadingComponent = () => <div>Loading</div>;
console.log(plugins);

const run = async () => {
  if (process.env.NODE_ENV === 'production') {
    // load remote plugin
    await loader(window.globals.installedPlugins);
  }
  // load local plugin
  window.globals.context.registerPlugins(plugins);

  ReactDOM.render(
    <Suspense fallback={LoadingComponent}>
      <App />
    </Suspense>,
    document.getElementById('root'),
  );
};

export default run;
