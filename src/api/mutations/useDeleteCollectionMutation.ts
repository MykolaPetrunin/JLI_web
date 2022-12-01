import ApiPaths from '@api/config/apiPaths';
import QueryRes from '@api/interfaces/queryRes';
import Res from '@api/interfaces/res';
import useQuery from '@api/queries/useQuery';
import Api from '@api/services/api';

interface UseDeleteCollectionMutationRes {
  collectionId: string;
}

interface UseDeleteCollectionMutationProps {
  collectionId: string;
}

const useDeleteCollectionMutation: () => QueryRes<
  UseDeleteCollectionMutationRes,
  UseDeleteCollectionMutationProps
> = () => {
  return useQuery<UseDeleteCollectionMutationRes, UseDeleteCollectionMutationProps>(
    async ({ collectionId }): Promise<UseDeleteCollectionMutationRes> => {
      const res = await Api.remove<Res<string>>({
        url: `${ApiPaths.CollectionDelete}/${collectionId}`,
      });

      return { collectionId: res.data.data };
    },
  );
};

export default useDeleteCollectionMutation;
