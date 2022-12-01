import ApiPaths from '@api/config/apiPaths';
import QueryRes from '@api/interfaces/queryRes';
import Res from '@api/interfaces/res';
import useQuery from '@api/queries/useQuery';
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

const useUpdateUserMutation: () => QueryRes<
  UseUpdateUserMutationRes,
  UseUpdateUserMutationProps
> = () => {
  return useQuery<UseUpdateUserMutationRes, UseUpdateUserMutationProps>(
    async ({ body }): Promise<UseUpdateUserMutationRes> => {
      const res = await Api.patch<Res<User>, UpdateUserBody>({
        url: ApiPaths.UserUpdate,
        body,
      });

      return { user: res.data.data };
    },
  );
};

export default useUpdateUserMutation;
