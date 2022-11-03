import React, { FC } from 'react';

import { AppBar, Box, Typography } from '@mui/material';

const Header: FC = () => {
  return (
    <AppBar position="static">
      <Box my={1} mx={2} display="flex" justifyContent="center">
        <Typography variant="h4">JustLearnIt</Typography>
      </Box>
    </AppBar>
  );
};

export default Header;
