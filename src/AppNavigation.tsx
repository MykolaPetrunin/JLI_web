import CurrentUserContext from '@store/currentUser/CurrentUserContext';
import axios from 'axios';
import React, { FC, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import useAuth from '@models/auth/useAuth';

import AuthPage from '@pages/AuthPage';
import CollectionCreatorPage from '@pages/CollectionCreatorPage';
import CollectionPage from '@pages/CollectionPage';
import HomePage from '@pages/HomePage';
import ProfilePage from '@pages/ProfilePage';
import RepeatPage from '@pages/RepeatPage';
import SettingsPage from '@pages/SettingsPage';
import StudyPage from '@pages/StudyPage';

import AppPaths from '@/config/appPaths';

const AppNavigation: FC = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

  useAuth();

  const {
    currentUserState: { isLoading, userId },
  } = useContext(CurrentUserContext);

  if (isLoading) {
    return (
      <Box height="100%" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!userId) return <AuthPage />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppPaths.Home} element={<HomePage />} />
        <Route path={AppPaths.Profile} element={<ProfilePage />} />
        <Route path={AppPaths.Settings} element={<SettingsPage />} />
        <Route path={AppPaths.Collection} element={<CollectionPage />} />
        <Route path={AppPaths.Study} element={<StudyPage />} />
        <Route path={AppPaths.Repeat} element={<RepeatPage />} />
        <Route path={AppPaths.CollectionsCreator} element={<CollectionCreatorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppNavigation;
