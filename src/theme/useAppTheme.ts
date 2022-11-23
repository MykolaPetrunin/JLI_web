import { useMemo } from 'react';

import { LinkProps, Theme, createTheme, useMediaQuery } from '@mui/material';

import LinkBehavior from '@/theme/components/LinkBehavior';

const useAppTheme: () => Theme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        components: {
          MuiLink: {
            defaultProps: {
              component: LinkBehavior,
            } as LinkProps,
          },
        },
      }),
    [prefersDarkMode],
  );
};

export default useAppTheme;
