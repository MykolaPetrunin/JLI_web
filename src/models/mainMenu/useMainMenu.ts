import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import menuItems from '@models/mainMenu/config/menuItems';

import MainMenuItem from '@atoms/mainMenu/interfaces/mainMenuItem';

import AppPaths from '@/config/appPaths';

export interface UseMainMenuRes {
  config: MainMenuItem[];
  value: number | false;
  onChange: (value: number) => void;
}

const useMainMenu: () => UseMainMenuRes = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const value = useMemo<number | false>(() => {
    if (pathname === AppPaths.Home) return false;
    const index = menuItems.findIndex(({ href }) => {
      if (href === AppPaths.Home) return false;

      return pathname.startsWith(href);
    });

    return index === -1 ? false : index;
  }, [pathname]);

  const onChange = (index: number) => {
    navigate({ pathname: menuItems[index].href });
  };

  return {
    config: menuItems,
    value,
    onChange,
  };
};

export default useMainMenu;
