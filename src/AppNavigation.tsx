import { useAuth0 } from '@auth0/auth0-react';
import React, { FC } from 'react';

import { Button, CircularProgress } from '@mui/material';

import useAxiosDefault from '@api/hooks/useAxiosDefault';

import Auth from '@pages/auth/Auth';

const AppNavigation: FC = () => {
  useAxiosDefault();

  const { user, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!user) return <Auth />;

  return (
    <>
      <Button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Button>
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    </>
  );
};

export default AppNavigation;
