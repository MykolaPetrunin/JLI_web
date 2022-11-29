import { UseQueryResult, useQuery } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
import Res from '@api/interfaces/res';
import UserRes from '@api/interfaces/userRes';
import Api from '@api/services/api';
import resToUser from '@api/utils/resToUser';

import User from '@models/currentUser/interfaces/user';

interface UseUserSettingsQueryRes {
  user: User;
}

const useCurrentUserQuery: () => UseQueryResult<UseUserSettingsQueryRes> = () => {
  return useQuery(
    ['UserSettingsQuery'],
    async () => {
      const res = await Api.get<Res<UserRes>>(ApiPaths.CurrentUserGet);
      return {
        user: resToUser(res.data.data),
      };
    },
    { retry: false, cacheTime: 0, enabled: false },
  );
};

export default useCurrentUserQuery;
