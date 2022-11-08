import { useAuth0 } from '@auth0/auth0-react';
import React, { FC } from 'react';

import { Box, Button } from '@mui/material';

const AuthPage: FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Button variant="contained" onClick={loginWithRedirect}>
        Log In
      </Button>
    </Box>
  );
};

export default AuthPage;
