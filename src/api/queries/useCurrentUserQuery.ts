import { UseQueryResult, useQuery } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';

import User from '@models/currentUser/interfaces/user';

interface UseUserSettingsQueryProps {
  userId: string;
}

interface UseUserSettingsQueryRes {
  user: User;
}

const useCurrentUserQuery: (
  props: UseUserSettingsQueryProps,
) => UseQueryResult<UseUserSettingsQueryRes> = ({ userId }) => {
  return useQuery(
    ['UserSettingsQuery'],
    async () => {
      const res = await Api.get<Res<User>>(`${ApiPaths.getCurrentUser}?userId=${userId}`);
      return {
        user: res.data.data,
      };
    },
    { retry: false, cacheTime: 0 },
  );
};

export default useCurrentUserQuery;
