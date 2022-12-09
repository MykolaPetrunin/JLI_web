import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import ApiPaths from '@api/config/apiPaths';
import ApiKeys from '@api/enums/apiKeys';
import CollectionQueryRes from '@api/interfaces/collectionQueryRes';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';
import resToCollection from '@api/utils/resToCollection';

import Collection from '@models/collection/interfaces/collection';

interface UseCollectionQueryProps {
  collectionId?: string;
}

interface UseCollectionQueryRes {
  collection?: Collection;
  unauthorized?: boolean;
}

const useCollectionQuery: (
  props: UseCollectionQueryProps,
) => UseQueryResult<UseCollectionQueryRes> = ({ collectionId }) => {
  return useQuery({
    queryKey: [ApiKeys.GetCollection, collectionId],
    enabled: !!collectionId,
    queryFn: async () => {
      try {
        const res = await Api.get<Res<CollectionQueryRes>>(
          `${ApiPaths.CollectionGet}/${collectionId}`,
        );

        return {
          collection: resToCollection(res.data.data),
        };
      } catch (err) {
        return {
          unauthorized: (err as AxiosError).response?.status === 403,
        };
      }
    },
  });
};

export default useCollectionQuery;
