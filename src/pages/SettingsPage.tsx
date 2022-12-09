import React, { FC } from 'react';

import { Box, CircularProgress } from '@mui/material';

import useCurrentUser from '@models/currentUser/useCurrentUser';
import useMainMenu from '@models/mainMenu/useMainMenu';
import useProfileMenu from '@models/profileMenu/useProfileMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import Header from '@atoms/header/Header';
import MainMenu from '@atoms/mainMenu/MainMenu';
import SettingsEdit from '@atoms/settingsEdit/SettingsEdit';
import Tabs from '@atoms/tabs/Tabs';

const SettingsPage: FC = () => {
  const mainMenuProps = useMainMenu();
  const profileMenuProps = useProfileMenu();

  const { currentUser, isCurrentUserLoading, updateSettings } = useCurrentUser();

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      <Tabs {...profileMenuProps} />
      <Box display="flex" alignItems="center" flexDirection="column" my={5}>
        {!currentUser && <CircularProgress />}

        {currentUser && (
          <SettingsEdit
            value={currentUser.settings}
            onChange={updateSettings}
            isUpdating={isCurrentUserLoading}
          />
        )}
      </Box>
    </MainPageTemplate>
  );
};

export default SettingsPage;
