import ApiPaths from '@api/config/apiPaths';
import QueryRes from '@api/interfaces/queryRes';
import Res from '@api/interfaces/res';
import useQuery from '@api/queries/useQuery';
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

const useCreateCollectionMutation: () => QueryRes<
  UseCreateCollectionMutationRes,
  UseCreateCollectionMutationProps
> = () => {
  return useQuery<UseCreateCollectionMutationRes, UseCreateCollectionMutationProps>(
    async (body): Promise<UseCreateCollectionMutationRes> => {
      const res = await Api.post<Res<Collection>, UseCreateCollectionMutationProps>({
        url: ApiPaths.CollectionsCreate,
        body,
      });

      return {
        collection: res.data.data,
      };
    },
  );
};

export default useCreateCollectionMutation;
