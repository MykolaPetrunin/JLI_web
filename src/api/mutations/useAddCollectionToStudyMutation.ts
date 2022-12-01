import ApiPaths from '@api/config/apiPaths';
import QueryRes from '@api/interfaces/queryRes';
import Res from '@api/interfaces/res';
import useQuery from '@api/queries/useQuery';
import Api from '@api/services/api';

import User from '@models/currentUser/interfaces/user';

interface UseAddCollectionToStudyMutationRes {
  user: User;
}

interface UseAddCollectionToStudyMutationProps {
  collectionId: string;
}

const useAddCollectionToStudyMutation: () => QueryRes<
  UseAddCollectionToStudyMutationRes,
  UseAddCollectionToStudyMutationProps
> = () => {
  return useQuery<UseAddCollectionToStudyMutationRes, UseAddCollectionToStudyMutationProps>(
    async (body): Promise<UseAddCollectionToStudyMutationRes> => {
      const res = await Api.post<Res<User>, { collectionId: string }>({
        url: ApiPaths.UserStudyCollection,
        body,
      });

      return {
        user: res.data.data,
      };
    },
  );
};

export default useAddCollectionToStudyMutation;
