import { UseMutationResult, useMutation } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';

import User from '@models/currentUser/interfaces/user';

interface UpdateUserBody {
  firstName?: string;
  lastName?: string;
  picture?: string;
}

interface UseUpdateUserMutationRes {
  user: User;
}

interface UseUpdateUserMutationProps {
  userId: string;
  body: UpdateUserBody;
}

const useUpdateUserMutation: () => UseMutationResult<
  UseUpdateUserMutationRes,
  unknown,
  UseUpdateUserMutationProps
> = () => {
  return useMutation(
    async ({ userId, body }): Promise<UseUpdateUserMutationRes> => {
      const res = await Api.patch<Res<User>, UpdateUserBody>({
        url: ApiPaths.updateUser(userId),
        body,
      });

      return { user: res.data.data };
    },
    { mutationKey: 'UseUpdateUserMutation' },
  );
};

export default useUpdateUserMutation;
