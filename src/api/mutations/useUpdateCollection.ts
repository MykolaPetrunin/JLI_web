import { UseMutationResult, useMutation } from '@tanstack/react-query';

import ApiPaths from '@api/config/apiPaths';
import ApiKeys from '@api/enums/apiKeys';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';

import Collection from '@models/collection/interfaces/collection';

interface UseUpdateCollectionMutationRes {
  collection: Collection;
}

interface UseUpdateCollectionMutationProps {
  id: string;
  name?: string;
  words?: Array<{
    id?: string;
    translation: string;
    word: string;
    image?: string;
  }>;
  isPrivate?: boolean;
}

const useUpdateCollectionMutation: () => UseMutationResult<
  UseUpdateCollectionMutationRes,
  unknown,
  UseUpdateCollectionMutationProps
> = () => {
  return useMutation({
    mutationKey: [ApiKeys.UpdateCollection],
    mutationFn: async (body): Promise<UseUpdateCollectionMutationRes> => {
      const res = await Api.patch<Res<Collection>, UseUpdateCollectionMutationProps>({
        url: `${ApiPaths.CollectionsUpdate}/${body.id}`,
        body,
      });

      return {
        collection: res.data.data,
      };
    },
  });
};

export default useUpdateCollectionMutation;
