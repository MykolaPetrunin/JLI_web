import { HomeOutlined, PersonOutlined } from '@mui/icons-material';

import MainMenuItem from '@atoms/mainMenu/interfaces/mainMenuItem';

import AppPaths from '@/config/appPaths';

const menuItems: MainMenuItem[] = [
  {
    Icon: HomeOutlined,
    href: AppPaths.Home,
  },
  {
    Icon: PersonOutlined,
    href: AppPaths.Profile,
  },
];

export default menuItems;
