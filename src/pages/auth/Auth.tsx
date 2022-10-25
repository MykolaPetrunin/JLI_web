import { useAuth0 } from '@auth0/auth0-react';
import React, { FC } from 'react';

import { Button } from '@mui/material';

const Auth: FC = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={loginWithRedirect}>Log In</Button>;
};

export default Auth;
