import { useAuth0 } from '@auth0/auth0-react';
import CurrentUserContext from '@store/currentUser/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';

import useUpdateUserMutation from '@api/mutations/useUpdateUserMutation';
import useUploadImageMutation from '@api/mutations/useUploadImageMutation';
import useCurrentUserQuery from '@api/queries/useCurrentUserQuery';

import User from '@models/currentUser/interfaces/user';

interface UseCurrentUserRes {
  currentUser?: User;
  logout: () => void;
  updateUser: (val: Omit<User, 'email'>) => Promise<void>;
}

const useCurrentUser: () => UseCurrentUserRes = () => {
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const { logout } = useAuth0();
  const { mutateAsync: uploadImage } = useUploadImageMutation();
  const { mutateAsync: updateUserMutation } = useUpdateUserMutation();
  const {
    currentUserState: { userId },
  } = useContext(CurrentUserContext);

  const { data } = useCurrentUserQuery({ userId: userId || '' });

  const updateUser = async (val: Omit<User, 'email'>): Promise<void> => {
    if (!userId) return;

    let imageId = '';

    if (val.picture && val.picture !== currentUser?.picture) {
      const res = await uploadImage({ image: val.picture });
      imageId = res.imageId;
    }

    const res = await updateUserMutation({
      userId,
      body: { ...val, ...(imageId !== '' ? { picture: imageId } : {}) },
    });

    setCurrentUser(res.user);
  };

  useEffect(() => {
    if (!data?.user) return;
    setCurrentUser(data.user);
  }, [data]);

  return {
    logout,
    currentUser,
    updateUser,
  };
};

export default useCurrentUser;
