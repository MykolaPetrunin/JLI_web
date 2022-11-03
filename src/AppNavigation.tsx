import CurrentUserContext from '@store/currentUser/CurrentUserContext';
import axios from 'axios';
import React, { FC, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import useAuth from '@hooks/useAuth/useAuth';

import AuthPage from '@pages/auth/AuthPage';
import HomePage from '@pages/home/HomePage';
import ProfilePage from '@pages/profile/ProfilePage';

import AppPaths from '@/config/appPaths';

const AppNavigation: FC = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

  useAuth();

  const {
    currentUserState: { isLoading, userId },
  } = useContext(CurrentUserContext);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!userId) return <AuthPage />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppPaths.Home} element={<HomePage />} />
        <Route path={AppPaths.Profile} element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppNavigation;
