import TabItem from '@atoms/tabs/interfaces/tabItem';

import AppPaths from '@/config/appPaths';

const profileMenuItems: TabItem[] = [
  {
    label: 'Профіль',
    href: AppPaths.Profile,
  },
  {
    label: 'Налаштування',
    href: AppPaths.Settings,
  },
];

export default profileMenuItems;
