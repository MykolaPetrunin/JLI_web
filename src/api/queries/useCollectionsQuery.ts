import { UseQueryResult, useQuery } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';

import Collection from '@models/collection/interfaces/collection';

interface UseCollectionsQueryProps {
  isEnabled: boolean;
}

interface UseCollectionsQueryRes {
  collections: Collection[];
}

const useCollectionsQuery: (
  props: UseCollectionsQueryProps,
) => UseQueryResult<UseCollectionsQueryRes> = ({ isEnabled }) => {
  return useQuery(
    ['UseCollectionsQuery'],
    async (): Promise<UseCollectionsQueryRes> => {
      const res = await Api.get<Res<Collection[]>>(ApiPaths.getCollections);

      return {
        collections: res.data.data,
      };
    },
    { retry: false, cacheTime: 0, enabled: isEnabled },
  );
};

export default useCollectionsQuery;
