import { UseMutationResult, useMutation } from '@tanstack/react-query';

import ApiPaths from '@api/config/apiPaths';
import ApiKeys from '@api/enums/apiKeys';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';

import Collection from '@models/collection/interfaces/collection';

interface UseCreateCollectionMutationRes {
  collection: Collection;
}

interface UseCreateCollectionMutationProps {
  name: string;
  words: Array<{
    translation: string;
    word: string;
    image?: string;
  }>;
  isPrivate: boolean;
}

const useCreateCollectionMutation: () => UseMutationResult<
  UseCreateCollectionMutationRes,
  unknown,
  UseCreateCollectionMutationProps
> = () => {
  return useMutation({
    mutationKey: [ApiKeys.CreateCollection],
    mutationFn: async (body): Promise<UseCreateCollectionMutationRes> => {
      const res = await Api.post<Res<Collection>, UseCreateCollectionMutationProps>({
        url: ApiPaths.CollectionsCreate,
        body,
      });

      return {
        collection: res.data.data,
      };
    },
  });
};

export default useCreateCollectionMutation;
