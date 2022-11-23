import { LinkProps, createTheme } from '@mui/material';

import LinkBehavior from '@/theme/components/LinkBehavior';

const mainTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
  },
});

export default mainTheme;
