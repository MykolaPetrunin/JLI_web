import { UseQueryResult, useQuery } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';

interface UserIdQueryBody {
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
}

interface UseUserIdQueryProps extends UserIdQueryBody {
  isEnabled: boolean;
}

interface UseUserIdQueryRes {
  userId: string;
}

const useUserIdQuery: (props: UseUserIdQueryProps) => UseQueryResult<UseUserIdQueryRes> = ({
  email,
  firstName,
  lastName,
  picture,
  isEnabled,
}) => {
  return useQuery(
    ['UserIdQuery'],
    async () => {
      const res = await Api.post<Res<string>, UserIdQueryBody>({
        url: ApiPaths.getUserId,
        body: {
          email,
          firstName,
          lastName,
          picture,
        },
      });
      return {
        userId: res.data.data,
      };
    },
    { retry: false, cacheTime: 0, enabled: isEnabled },
  );
};

export default useUserIdQuery;
