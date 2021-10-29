import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { KubedConfigProvider, CssBaseline } from '@kubed/components';
import { useLocalStorage } from '@kubed/hooks';

import { PrefersContext, themes } from './libs/usePrefers';

const App = () => {
  const [themeLocalValue, setThemeLocalValue] = useLocalStorage({
    key: 'themeType',
    defaultValue: 'light',
  });
  const [themeType, setThemeType] = useState('light');

  useEffect(() => {
    document.documentElement.removeAttribute('style');
    document.body.removeAttribute('style');

    if (themes.includes(themeLocalValue)) setThemeType(themeLocalValue);
  }, []);

  const switchTheme = useCallback(theme => {
    setThemeType(theme);
    setThemeLocalValue(theme);
  }, []);

  const { routes } = window.globals.context;
  console.log('routes', routes);

  return (
    <KubedConfigProvider themeType={themeType}>
      <CssBaseline />
      <PrefersContext.Provider value={{ themeType, switchTheme }}>
        <Router>{renderRoutes(routes)}</Router>
      </PrefersContext.Provider>
    </KubedConfigProvider>
  );
};

export default App;
