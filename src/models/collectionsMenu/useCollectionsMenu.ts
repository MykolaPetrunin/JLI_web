import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import collectionsMenuItems from '@models/collectionsMenu/config/collectionsMenuItems';

import TabItem from '@atoms/tabs/interfaces/tabItem';

import AppPaths from '@/config/appPaths';

interface UseCollectionsMenuRes {
  config: TabItem[];
  value: number;
  onChange: (value: number) => void;
}

const useCollectionsMenu: () => UseCollectionsMenuRes = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const value = useMemo<number>(() => {
    if (pathname === AppPaths.Collections) return 0;

    return collectionsMenuItems.findIndex(({ href }) => href.startsWith(pathname));
  }, [pathname]);

  const onChange = (index: number) => {
    navigate({ pathname: collectionsMenuItems[index].href });
  };

  return {
    config: collectionsMenuItems,
    value,
    onChange,
  };
};

export default useCollectionsMenu;
