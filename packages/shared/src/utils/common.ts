export const getBrowserLang = (): string => {
  // @ts-ignore
  const lang = (navigator.language || navigator.browserLanguage).toLowerCase();

  if (lang === 'zh-tw') {
    return 'tc';
  }
  if (lang.indexOf('zh') !== -1) {
    return 'zh';
  }
  if (lang.indexOf('en') !== -1) {
    return 'en';
  }

  return window.globals.config.defaultLang || 'en';
};
