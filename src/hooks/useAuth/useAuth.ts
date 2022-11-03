import { useAuth0 } from '@auth0/auth0-react';
import CurrentUserContext from '@store/currentUser/CurrentUserContext';
import {
  setCurrentUserId,
  setCurrentUserLoadingState,
} from '@store/currentUser/currentUserActions';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import useUserIdQuery from '@api/queries/useUserIdQuery';

const useAuth: () => void = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  const [isHasToken, setIsHasToken] = useState<boolean>(false);
  const { dispatchCurrentUserState } = useContext(CurrentUserContext);
  const { data } = useUserIdQuery({
    email: user?.email || '',
    picture: user?.picture,
    firstName: user?.name,
    lastName: user?.family_name,
    isEnabled: !!user?.email && isHasToken,
  });

  useEffect(() => {
    if (!data?.userId) return;
    dispatchCurrentUserState(setCurrentUserId(data.userId));
  }, [data]);

  useEffect(() => {
    if (!user && isLoading) return;

    if (!user && !isLoading) {
      dispatchCurrentUserState(setCurrentUserLoadingState(false));
      return;
    }

    getAccessTokenSilently().then((jwt) => {
      axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
      setIsHasToken(true);
    });
  }, [user, isLoading]);
};

export default useAuth;
