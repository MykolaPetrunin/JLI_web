import { UseQueryResult, useQuery } from '@tanstack/react-query';

import ApiPaths from '@api/config/apiPaths';
import ApiKeys from '@api/enums/apiKeys';
import CollectionQueryRes from '@api/interfaces/collectionQueryRes';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';
import resToCollection from '@api/utils/resToCollection';

import Collection from '@models/collection/interfaces/collection';

interface UseCollectionsQueryProps {
  isMy?: boolean;
}

interface UseCollectionsQueryRes {
  collections: Collection[];
}

const useCollectionsQuery: (
  props: UseCollectionsQueryProps,
) => UseQueryResult<UseCollectionsQueryRes> = ({ isMy }) => {
  return useQuery({
    queryKey: [ApiKeys.GetCollections, isMy],
    queryFn: async () => {
      const res = await Api.get<Res<CollectionQueryRes[]>>(
        `${ApiPaths.CollectionsGet}${isMy ? '?isMy=true' : ''}`,
      );

      return {
        collections: res.data.data.map(resToCollection),
      };
    },
  });
};

export default useCollectionsQuery;
