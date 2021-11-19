import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { KubedConfigProvider, CssBaseline, Notify } from '@kubed/components';
import { useLocalStorage } from '@kubed/hooks';

import GlobalStyles from './components/GlobalStyles';
import { PrefersContext, themes } from './libs/usePrefers';

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
    <KubedConfigProvider themeType={themeType}>
      <CssBaseline />
      <GlobalStyles />
      <PrefersContext.Provider value={{ themeType, switchTheme }}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Pages />
          </Router>
          <Notify position="top-right" />
        </QueryClientProvider>
      </PrefersContext.Provider>
    </KubedConfigProvider>
  );
};

export default App;
