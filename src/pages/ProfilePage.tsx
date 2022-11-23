import React, { FC, useEffect } from 'react';

import { Button, CircularProgress, Grid } from '@mui/material';

import useCurrentUser from '@models/currentUser/useCurrentUser';
import useMainMenu from '@models/mainMenu/useMainMenu';
import useProfileMenu from '@models/profileMenu/useProfileMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import Header from '@atoms/header/Header';
import MainMenu from '@atoms/mainMenu/MainMenu';
import ProfileEditor from '@atoms/profileEditor/ProfileEditor';
import Tabs from '@atoms/tabs/Tabs';

const ProfilePage: FC = () => {
  const mainMenuProps = useMainMenu();
  const profileMenuProps = useProfileMenu();
  const { currentUser, logout, updateUser, fetchCurrentUser } = useCurrentUser();

  useEffect(() => {
    fetchCurrentUser().then();
  }, []);

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      <Tabs {...profileMenuProps} />

      <Grid container my={5} spacing={2}>
        <Grid item xs={12} display="flex" alignItems="center" flexDirection="column" mx={2}>
          {!currentUser && <CircularProgress />}
          {currentUser && (
            <ProfileEditor value={currentUser} isUpdating={false} onChange={updateUser} />
          )}
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center" flexDirection="column">
          <Button variant="text" onClick={logout} size="large">
            Вийти
          </Button>
        </Grid>
      </Grid>
    </MainPageTemplate>
  );
};

export default ProfilePage;
