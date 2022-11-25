import { UseMutationResult, useMutation } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';

import User from '@models/currentUser/interfaces/user';

interface UseAddCollectionToStudyMutationRes {
  user: User;
}

interface UseAddCollectionToStudyMutationProps {
  collectionId: string;
}

const useAddCollectionToStudyMutation: () => UseMutationResult<
  UseAddCollectionToStudyMutationRes,
  unknown,
  UseAddCollectionToStudyMutationProps
> = () => {
  return useMutation(
    async (body): Promise<UseAddCollectionToStudyMutationRes> => {
      const res = await Api.post<Res<User>, { collectionId: string }>({
        url: ApiPaths.UserStudyCollection,
        body,
      });

      return {
        user: res.data.data,
      };
    },
    { mutationKey: 'UseAddCollectionToStudyMutationMutation' },
  );
};

export default useAddCollectionToStudyMutation;
