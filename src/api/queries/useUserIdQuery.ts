import ApiPaths from '@api/config/apiPaths';
import QueryRes from '@api/interfaces/queryRes';
import Res from '@api/interfaces/res';
import useQuery from '@api/queries/useQuery';
import Api from '@api/services/api';

interface UserIdQueryBody {
  email: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
}

interface UseUserIdQueryRes {
  userId: string;
}

const useUserIdQuery: () => QueryRes<UseUserIdQueryRes, UserIdQueryBody> = () => {
  return useQuery<UseUserIdQueryRes, UserIdQueryBody>(
    async ({ email, firstName, lastName, picture }) => {
      const res = await Api.post<Res<string>, UserIdQueryBody>({
        url: ApiPaths.UserIdGet,
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
  );
};

export default useUserIdQuery;
