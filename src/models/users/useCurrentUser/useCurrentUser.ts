import { useAuth0 } from '@auth0/auth0-react';
import CurrentUserContext from '@store/currentUser/CurrentUserContext';
import { useContext } from 'react';

import useCurrentUserQuery from '@api/queries/useCurrentUserQuery';

import User from '@models/users/useCurrentUser/interfaces/user';

interface UseCurrentUserRes {
  currentUser?: User;
  logout: () => void;
}

const useCurrentUser: () => UseCurrentUserRes = () => {
  const { logout } = useAuth0();
  const {
    currentUserState: { userId },
  } = useContext(CurrentUserContext);

  const { data } = useCurrentUserQuery({ userId: userId || '' });

  return {
    logout,
    currentUser: data?.user,
  };
};

export default useCurrentUser;
