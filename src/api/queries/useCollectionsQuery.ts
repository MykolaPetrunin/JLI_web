import { UseQueryResult, useQuery } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
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
) => UseQueryResult<UseCollectionsQueryRes> = ({ isMy = false }) => {
  return useQuery(
    ['UseCollectionsQuery'],
    async (): Promise<UseCollectionsQueryRes> => {
      const res = await Api.get<Res<CollectionQueryRes[]>>(
        `${ApiPaths.CollectionsGet}${isMy ? '?isMy=true' : ''}`,
      );

      return {
        collections: res.data.data.map(resToCollection),
      };
    },
    { retry: false, cacheTime: 0, enabled: false },
  );
};

export default useCollectionsQuery;
