import { AxiosError } from 'axios';

import ApiPaths from '@api/config/apiPaths';
import CollectionQueryRes from '@api/interfaces/collectionQueryRes';
import QueryRes from '@api/interfaces/queryRes';
import Res from '@api/interfaces/res';
import useQuery from '@api/queries/useQuery';
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

const useCollectionQuery: () => QueryRes<UseCollectionQueryRes, UseCollectionQueryProps> = () => {
  return useQuery<UseCollectionQueryRes, UseCollectionQueryProps>(async ({ collectionId }) => {
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
  });
};

export default useCollectionQuery;
