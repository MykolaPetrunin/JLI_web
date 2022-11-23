import React, { FC } from 'react';

import { Tab, Tabs } from '@mui/material';

import MainMenuItem from './interfaces/mainMenuItem';

interface MainMenuProps {
  config: MainMenuItem[];
  value: number | false;
  onChange: (value: number) => void;
}

const MainMenu: FC<MainMenuProps> = ({ config, value, onChange }) => {
  return (
    <Tabs value={value} variant="fullWidth">
      {config.map(({ Icon, href }, index) => (
        <Tab key={href} onClick={() => onChange(index)} icon={<Icon />} />
      ))}
    </Tabs>
  );
};

export default MainMenu;
