import { Auth0Provider } from '@auth0/auth0-react';
import CurrentUserProvider from '@store/currentUser/CurrentUserProvider';
import React, { FC, PropsWithChildren } from 'react';

import { ThemeProvider } from '@mui/material';

import useAppTheme from '@/theme/useAppTheme';

const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  const theme = useAppTheme();
  return (
    <ThemeProvider theme={theme}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
        redirectUri={window.location.origin}
        audience="JustLearnIt"
      >
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </Auth0Provider>
    </ThemeProvider>
  );
};

export default AppProviders;
