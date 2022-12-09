import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

import ApiPaths from '@api/config/apiPaths';
import ApiKeys from '@api/enums/apiKeys';
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ApiKeys.AddCollectionToStudy],
    mutationFn: async (body): Promise<UseAddCollectionToStudyMutationRes> => {
      const res = await Api.post<Res<User>, { collectionId: string }>({
        url: ApiPaths.UserStudyCollection,
        body,
      });

      return {
        user: res.data.data,
      };
    },
    onSuccess: (data) => {
      queryClient.setQueryData([ApiKeys.CurrentUserKey], (user) =>
        user ? { ...user, ...data.user } : undefined,
      );
    },
  });
};

export default useAddCollectionToStudyMutation;
