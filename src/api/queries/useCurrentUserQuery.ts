import ApiPaths from '@api/config/apiPaths';
import QueryRes from '@api/interfaces/queryRes';
import Res from '@api/interfaces/res';
import UserRes from '@api/interfaces/userRes';
import useQuery from '@api/queries/useQuery';
import Api from '@api/services/api';
import resToUser from '@api/utils/resToUser';

import User from '@models/currentUser/interfaces/user';

interface UseUserSettingsQueryRes {
  user: User;
}

const useCurrentUserQuery: () => QueryRes<UseUserSettingsQueryRes> = () => {
  return useQuery<UseUserSettingsQueryRes>(async () => {
    const res = await Api.get<Res<UserRes>>(ApiPaths.CurrentUserGet);
    return {
      user: resToUser(res.data.data),
    };
  });
};

export default useCurrentUserQuery;
