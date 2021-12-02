import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { KubedConfigProvider, CssBaseline, Notify } from '@kubed/components';
import { useLocalStorage } from '@kubed/hooks';

import GlobalStyles from './components/GlobalStyles';
import { PrefersContext, themes } from './libs/usePrefers';
import get from 'lodash/get';
import { getBrowserLang } from '@ks-console/shared';

const Pages = () => {
  const { routes } = globals.context;
  return useRoutes(routes);
};

const App = () => {
  const [themeLocalValue, setThemeLocalValue] = useLocalStorage({
    key: 'themeType',
    defaultValue: 'light',
  });
  const [themeType, setThemeType] = useState('light');
  const userLang = get(globals.user, 'lang') || getBrowserLang();

  useEffect(() => {
    document.documentElement.removeAttribute('style');
    document.body.removeAttribute('style');
    if (themes.includes(themeLocalValue)) setThemeType(themeLocalValue);
  }, []);

  const switchTheme = useCallback(theme => {
    setThemeType(theme);
    setThemeLocalValue(theme);
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <KubedConfigProvider themeType={themeType} locale={userLang}>
          <CssBaseline />
          <GlobalStyles />
          <PrefersContext.Provider value={{ themeType, switchTheme }}>
            <Pages />
            <Notify position="top-right" />
          </PrefersContext.Provider>
        </KubedConfigProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
