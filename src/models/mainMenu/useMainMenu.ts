import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import menuItems from '@models/mainMenu/config/menuItems';

import MainMenuItem from '@atoms/mainMenu/interfaces/mainMenuItem';

import AppPaths from '@/config/appPaths';

interface UseMainMenuRes {
  config: MainMenuItem[];
  value: number;
  onChange: (value: number) => void;
}

const useMainMenu: () => UseMainMenuRes = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const value = useMemo<number>(() => {
    if (pathname === AppPaths.Home) return 0;

    return menuItems.findIndex(({ href }) => {
      if (href === AppPaths.Home) return false;

      return pathname.startsWith(href);
    });
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
