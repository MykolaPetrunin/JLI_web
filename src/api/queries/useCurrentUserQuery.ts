import { UseQueryResult, useQuery } from '@tanstack/react-query';

import ApiPaths from '@api/config/apiPaths';
import ApiKeys from '@api/enums/apiKeys';
import Res from '@api/interfaces/res';
import UserRes from '@api/interfaces/userRes';
import Api from '@api/services/api';
import resToUser from '@api/utils/resToUser';

import User from '@models/currentUser/interfaces/user';

const useCurrentUserQuery: () => UseQueryResult<User> = () => {
  return useQuery({
    queryKey: [ApiKeys.CurrentUserKey],
    queryFn: async (): Promise<User> => {
      const res = await Api.get<Res<UserRes>>(ApiPaths.CurrentUserGet);

      return resToUser(res.data.data);
    },
  });
};

export default useCurrentUserQuery;
