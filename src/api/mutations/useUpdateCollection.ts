import ApiPaths from '@api/config/apiPaths';
import QueryRes from '@api/interfaces/queryRes';
import Res from '@api/interfaces/res';
import useQuery from '@api/queries/useQuery';
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

const useUpdateCollectionMutation: () => QueryRes<
  UseUpdateCollectionMutationRes,
  UseUpdateCollectionMutationProps
> = () => {
  return useQuery<UseUpdateCollectionMutationRes, UseUpdateCollectionMutationProps>(
    async (body): Promise<UseUpdateCollectionMutationRes> => {
      const res = await Api.patch<Res<Collection>, UseUpdateCollectionMutationProps>({
        url: `${ApiPaths.CollectionsUpdate}/${body.id}`,
        body,
      });

      return {
        collection: res.data.data,
      };
    },
  );
};

export default useUpdateCollectionMutation;
