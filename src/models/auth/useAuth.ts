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
  const { fetch: fetchUserId } = useUserIdQuery();

  useEffect(() => {
    if (!user?.email || !isHasToken) return;

    fetchUserId({
      email: user?.email || '',
      picture: user?.picture,
      firstName: user?.given_name,
      lastName: user?.family_name,
    }).then((res) => {
      axios.defaults.headers.common.CurrentUserId = res.userId;
      dispatchCurrentUserState(setCurrentUserId(res.userId));
    });
  }, [isHasToken, user]);

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
