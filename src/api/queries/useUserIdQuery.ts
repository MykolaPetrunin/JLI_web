import { UseQueryResult, useQuery } from '@tanstack/react-query';

import ApiPaths from '@api/config/apiPaths';
import ApiKeys from '@api/enums/apiKeys';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';

interface UserIdQueryBody {
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
}

interface UseUserIdQueryProps {
  body: UserIdQueryBody;
  isEnabled: boolean;
}

const useUserIdQuery: (props: UseUserIdQueryProps) => UseQueryResult<string> = ({
  body,
  isEnabled,
}) => {
  return useQuery({
    queryKey: [ApiKeys.GetUserId, body],
    queryFn: async () => {
      const res = await Api.post<Res<string>, UserIdQueryBody>({
        url: ApiPaths.UserIdGet,
        body,
      });
      return res.data.data;
    },
    enabled: isEnabled,
  });
};

export default useUserIdQuery;
