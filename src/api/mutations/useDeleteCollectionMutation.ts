import { UseMutationResult, useMutation } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
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
  return useMutation(
    async ({ collectionId }): Promise<UseDeleteCollectionMutationRes> => {
      const res = await Api.remove<Res<string>>({
        url: `${ApiPaths.CollectionDelete}/${collectionId}`,
      });

      return { collectionId: res.data.data };
    },
    { mutationKey: 'UseDeleteCollectionMutation' },
  );
};

export default useDeleteCollectionMutation;
