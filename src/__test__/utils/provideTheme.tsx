// @ts-ignore
import React, { ReactElement } from 'react';

import { ThemeProvider } from '@mui/material';

// @ts-ignore
import mainTheme from '@/theme/mainTheme';

export default (ui: ReactElement): ReactElement => {
  return <ThemeProvider theme={mainTheme}>{ui}</ThemeProvider>;
};
