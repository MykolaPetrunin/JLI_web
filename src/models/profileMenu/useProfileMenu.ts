import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import profileMenuItems from '@models/profileMenu/config/profileMenuItems';

import TabItem from '@atoms/tabs/interfaces/tabItem';

import AppPaths from '@/config/appPaths';

interface UseProfileMenuRes {
  config: TabItem[];
  value: number;
  onChange: (value: number) => void;
}

const useProfileMenu: () => UseProfileMenuRes = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const value = useMemo<number>(() => {
    if (pathname === AppPaths.Profile) return 0;

    return profileMenuItems.findIndex(({ href }) => href.startsWith(pathname));
  }, [pathname]);

  const onChange = (index: number) => {
    navigate({ pathname: profileMenuItems[index].href });
  };

  return {
    config: profileMenuItems,
    value,
    onChange,
  };
};

export default useProfileMenu;
