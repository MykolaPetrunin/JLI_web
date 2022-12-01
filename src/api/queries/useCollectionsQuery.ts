import ApiPaths from '@api/config/apiPaths';
import CollectionQueryRes from '@api/interfaces/collectionQueryRes';
import QueryRes from '@api/interfaces/queryRes';
import Res from '@api/interfaces/res';
import useQuery from '@api/queries/useQuery';
import Api from '@api/services/api';
import resToCollection from '@api/utils/resToCollection';

import Collection from '@models/collection/interfaces/collection';

interface UseCollectionsQueryProps {
  isMy?: boolean;
}

interface UseCollectionsQueryRes {
  collections: Collection[];
}

const useCollectionsQuery: () => QueryRes<
  UseCollectionsQueryRes,
  UseCollectionsQueryProps
> = () => {
  return useQuery<UseCollectionsQueryRes, UseCollectionsQueryProps>(async ({ isMy }) => {
    const res = await Api.get<Res<CollectionQueryRes[]>>(
      `${ApiPaths.CollectionsGet}${isMy ? '?isMy=true' : ''}`,
    );

    return {
      collections: res.data.data.map(resToCollection),
    };
  });
};

export default useCollectionsQuery;
