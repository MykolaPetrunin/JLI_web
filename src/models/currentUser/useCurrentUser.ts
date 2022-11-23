import { useAuth0 } from '@auth0/auth0-react';
import CurrentUserContext from '@store/currentUser/CurrentUserContext';
import { setCurrentUser } from '@store/currentUser/currentUserActions';
import { useContext, useEffect } from 'react';

import useUpdateUserMutation from '@api/mutations/useUpdateUserMutation';
import useUploadImageMutation from '@api/mutations/useUploadImageMutation';
import useCurrentUserQuery from '@api/queries/useCurrentUserQuery';

import User from '@models/currentUser/interfaces/user';

interface UseCurrentUserRes {
  userId?: string;
  currentUser?: User;
  fetchCurrentUser: () => Promise<void>;
  logout: () => void;
  updateUser: (val: Omit<User, 'email'>) => Promise<void>;
}

const useCurrentUser: () => UseCurrentUserRes = () => {
  const {
    currentUserState: { userId, user: currentUser },
    dispatchCurrentUserState,
  } = useContext(CurrentUserContext);

  const { logout } = useAuth0();
  const { mutateAsync: uploadImage } = useUploadImageMutation();
  const { mutateAsync: updateUserMutation } = useUpdateUserMutation();

  const { data: currentUserData, refetch: fetchCurrentUserQuery } = useCurrentUserQuery();

  const updateUser = async (val: Omit<User, 'email'>): Promise<void> => {
    let imageId = '';

    if (val.picture && val.picture !== currentUser?.picture) {
      const res = await uploadImage({ image: val.picture });
      imageId = res.imageId;
    }

    const res = await updateUserMutation({
      body: { ...val, ...(imageId !== '' ? { picture: imageId } : {}) },
    });

    dispatchCurrentUserState(setCurrentUser(res.user));
  };

  useEffect(() => {
    if (!currentUserData?.user) return;

    dispatchCurrentUserState(setCurrentUser(currentUserData.user));
  }, [currentUserData]);

  const fetchCurrentUser = async (): Promise<void> => {
    await fetchCurrentUserQuery({ fetching: true });
  };

  return {
    userId,
    logout,
    currentUser,
    updateUser,
    fetchCurrentUser,
  };
};

export default useCurrentUser;
