import { UseMutationResult, useMutation } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
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
  return useMutation(
    async (body): Promise<UseCreateCollectionMutationRes> => {
      const res = await Api.post<Res<Collection>, UseCreateCollectionMutationProps>({
        url: ApiPaths.CollectionsCreate,
        body,
      });

      return {
        collection: res.data.data,
      };
    },
    { mutationKey: 'UseCreateCollectionMutation' },
  );
};

export default useCreateCollectionMutation;
