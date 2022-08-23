import { useStore } from '@kubed/stook';

export interface GlobalStore {
  globalNavOpen: boolean;
  navs: Record<string, any>;
}

const initialGlobalStore: GlobalStore = {
  globalNavOpen: false,
  navs: {},
};

export const useGlobalStore = () => {
  const [globalStore, setGlobalStore] = useStore<GlobalStore>('GlobalStore', initialGlobalStore);

  const getNav = (name: string) => {
    return globalStore.navs[name];
  };

  const setNav = (key: string, data: any) => {
    setGlobalStore(state => {
      state.navs[key] = data;
    });
  };

  const setNavOpen = (isOpen: boolean) => {
    setGlobalStore(state => {
      state.globalNavOpen = isOpen;
    });
  };

  return { globalStore, setNavOpen, getNav, setNav, setGlobalStore };
};
