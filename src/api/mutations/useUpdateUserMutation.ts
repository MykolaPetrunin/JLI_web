import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

import ApiPaths from '@api/config/apiPaths';
import ApiKeys from '@api/enums/apiKeys';
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
  body: UpdateUserBody;
}

const useUpdateUserMutation: () => UseMutationResult<
  UseUpdateUserMutationRes,
  unknown,
  UseUpdateUserMutationProps
> = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ body }): Promise<UseUpdateUserMutationRes> => {
      const res = await Api.patch<Res<User>, UpdateUserBody>({
        url: ApiPaths.UserUpdate,
        body,
      });

      return { user: res.data.data };
    },
    mutationKey: [ApiKeys.UpdateUser],
    onSuccess: (data) => {
      queryClient.setQueryData([ApiKeys.CurrentUserKey], (user) =>
        user ? { ...user, ...data.user } : undefined,
      );
    },
  });
};

export default useUpdateUserMutation;
