import TabItem from '@atoms/tabs/interfaces/tabItem';

import AppPaths from '@/config/appPaths';

const collectionsMenuItems: TabItem[] = [
  {
    label: 'Популярні колекції',
    href: AppPaths.Collections,
  },
  {
    label: 'Мої колекції',
    href: AppPaths.CollectionsMy,
  },
];

export default collectionsMenuItems;
