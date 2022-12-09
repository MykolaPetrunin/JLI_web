import { UseQueryResult, useQuery } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
import Res from '@api/interfaces/res';
import UserRes from '@api/interfaces/userRes';
import Api from '@api/services/api';
import resToUser from '@api/utils/resToUser';

import User from '@models/currentUser/interfaces/user';

const useCurrentUserQuery: () => UseQueryResult<User> = () => {
  return useQuery(['UseCurrentUserQuery'], async (): Promise<User> => {
    const res = await Api.get<Res<UserRes>>(ApiPaths.CurrentUserGet);

    return resToUser(res.data.data);
  });
};

export default useCurrentUserQuery;
