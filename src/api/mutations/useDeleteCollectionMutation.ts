import { UseMutationResult, useMutation } from '@tanstack/react-query';

import ApiPaths from '@api/config/apiPaths';
import ApiKeys from '@api/enums/apiKeys';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';

interface UseDeleteCollectionMutationRes {
  collectionId: string;
}

interface UseDeleteCollectionMutationProps {
  collectionId: string;
}

const useDeleteCollectionMutation: () => UseMutationResult<
  UseDeleteCollectionMutationRes,
  unknown,
  UseDeleteCollectionMutationProps
> = () => {
  return useMutation({
    mutationKey: [ApiKeys.DeleteCollection],
    mutationFn: async ({ collectionId }): Promise<UseDeleteCollectionMutationRes> => {
      const res = await Api.remove<Res<string>>({
        url: `${ApiPaths.CollectionDelete}/${collectionId}`,
      });

      return { collectionId: res.data.data };
    },
  });
};

export default useDeleteCollectionMutation;
