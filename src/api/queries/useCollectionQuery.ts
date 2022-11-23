import { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
import CollectionQueryRes from '@api/interfaces/collectionQueryRes';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';
import resToCollection from '@api/utils/resToCollection';

import Collection from '@models/collection/interfaces/collection';

interface UseCollectionQueryProps {
  collectionId: string;
}

interface UseCollectionQueryRes {
  collection?: Collection;
  unauthorized?: boolean;
}

const useCollectionQuery: (
  props: UseCollectionQueryProps,
) => UseQueryResult<UseCollectionQueryRes> = ({ collectionId }) => {
  return useQuery(
    ['UseCollectionQuery'],
    async (): Promise<UseCollectionQueryRes> => {
      try {
        const res = await Api.get<Res<CollectionQueryRes>>(
          `${ApiPaths.CollectionGet}/${collectionId}`,
        );

        return {
          // eslint-disable-next-line no-underscore-dangle
          collection: resToCollection(res.data.data),
        };
      } catch (err) {
        return {
          unauthorized: (err as AxiosError).response?.status === 403,
        };
      }
    },
    { retry: false, cacheTime: 0, enabled: false },
  );
};

export default useCollectionQuery;
