import React, { FC } from 'react';

import { Tab, Tabs as TabsMui } from '@mui/material';

import TabItem from '@atoms/tabs/interfaces/tabItem';

interface MainMenuProps {
  config: TabItem[];
  value: number;
  onChange: (value: number) => void;
}

const Tabs: FC<MainMenuProps> = ({ config, value, onChange }) => {
  return (
    <TabsMui value={value} variant="fullWidth" onChange={(e, val) => onChange(val)}>
      {config.map(({ label, href }) => (
        <Tab key={href} label={label} />
      ))}
    </TabsMui>
  );
};

export default Tabs;
