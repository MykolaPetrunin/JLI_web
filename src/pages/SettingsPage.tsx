import React, { FC } from 'react';

import { Box, CircularProgress } from '@mui/material';

import useMainMenu from '@models/mainMenu/useMainMenu';
import useProfileMenu from '@models/profileMenu/useProfileMenu';
import useSettings from '@models/settings/useSettings';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import Header from '@atoms/header/Header';
import MainMenu from '@atoms/mainMenu/MainMenu';
import SettingsEdit from '@atoms/settingsEdit/SettingsEdit';
import Tabs from '@atoms/tabs/Tabs';

const SettingsPage: FC = () => {
  const mainMenuProps = useMainMenu();
  const profileMenuProps = useProfileMenu();

  const { settings, updateSettings, isUpdating } = useSettings();

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      <Tabs {...profileMenuProps} />
      <Box display="flex" alignItems="center" flexDirection="column" my={5}>
        {!settings && <CircularProgress />}

        {settings && (
          <SettingsEdit value={settings} onChange={updateSettings} isUpdating={isUpdating} />
        )}
      </Box>
    </MainPageTemplate>
  );
};

export default SettingsPage;
