import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Loading } from '@kubed/components';
import App from './App';
import loader from './libs/loader';
import i18n from './libs/i18n';
import emitter from './libs/emitter';

const run = async () => {
  if (process.env.NODE_ENV === 'production') {
    // load remote plugin
    await loader(globals.installedExtensions);
  }

  await i18n.init();
  emitter.init();

  ReactDOM.render(
    <Suspense fallback={<Loading className="page-loading" />}>
      <App />
    </Suspense>,
    document.getElementById('root'),
  );
};

export default run;
