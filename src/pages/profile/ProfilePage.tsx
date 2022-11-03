import React, { FC } from 'react';

import { Avatar, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

import useCurrentUser from '@models/users/useCurrentUser/useCurrentUser';

import useMainMenu from '@hooks/useManMenu/useMainMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import Header from '@atoms/header/Header';
import MainMenu from '@atoms/mainMenu/MainMenu';

const ProfilePage: FC = () => {
  const mainMenuProps = useMainMenu();
  const { currentUser, logout } = useCurrentUser();

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      <Grid2 my={5} spacing={2}>
        <Grid2 xs={12} display="flex" alignItems="center" flexDirection="column" mx={2}>
          <Avatar
            alt={`${currentUser?.firstName} ${currentUser?.lastName}`}
            src={currentUser?.picture}
            sx={{ width: 150, height: 150 }}
          />
        </Grid2>
        <Grid2 xs={12} display="flex" alignItems="center" flexDirection="column" mx={2}>
          <Button variant="text" onClick={logout} size="large">
            Вийти
          </Button>
        </Grid2>
      </Grid2>
    </MainPageTemplate>
  );
};

export default ProfilePage;
