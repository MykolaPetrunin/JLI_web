import { Auth0Provider } from '@auth0/auth0-react';
import React, { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider } from '@mui/material';

import mainTheme from '@/theme/mainTheme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={mainTheme}>
      <QueryClientProvider client={queryClient}>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
          redirectUri={window.location.origin}
          audience="JustLearnIt"
        >
          {children}
        </Auth0Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
