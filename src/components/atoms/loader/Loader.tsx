import React, { FC } from 'react';

import { Box, CircularProgress } from '@mui/material';

const Loader: FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flex="1"
      width="100%"
      height="100%"
    >
      <CircularProgress size={30} />
    </Box>
  );
};

export default Loader;
