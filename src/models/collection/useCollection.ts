import { useState } from 'react';

import useCreateCollectionMutation from '@api/mutations/useCreateCollection';
import useCollectionQuery from '@api/queries/useCollectionQuery';
import useCollectionsQuery from '@api/queries/useCollectionsQuery';

import Collection from '@models/collection/interfaces/collection';
import CreateCollectionInput from '@models/collection/interfaces/createCollectionInput';

interface UseCollectionRes {
  collection?: Collection;
  collections: Collection[];
  createCollection: (val: CreateCollectionInput) => Promise<Collection>;
  fetchCollections: () => Promise<Collection[]>;
  fetchCollection: () => Promise<Collection | undefined>;
  isCollectionsLoading: boolean;
  isCollectionLoading: boolean;
  isCollectionCreating: boolean;
  isUnauthorized: boolean;
}

interface UseCollectionProps {
  collectionId?: string;
  isMy?: boolean;
}

const useCollection: (props: UseCollectionProps) => UseCollectionRes = ({
  isMy = false,
  collectionId,
}) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collection, setCollection] = useState<Collection | undefined>();
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);

  const { refetch: reFetchCollections, isFetching: isCollectionsLoading } = useCollectionsQuery({
    isMy,
  });
  const { refetch: reFetchCollection, isFetching: isCollectionLoading } = useCollectionQuery({
    collectionId: collectionId || '',
  });

  const { mutateAsync: createCollectionMutation, isLoading: isCollectionCreating } =
    useCreateCollectionMutation();

  const fetchCollections = async (): Promise<Collection[]> => {
    const res = await reFetchCollections();

    setCollections(res.data?.collections || []);

    return res.data?.collections || [];
  };

  const fetchCollection = async (): Promise<Collection | undefined> => {
    const res = await reFetchCollection();

    setIsUnauthorized(!!res.data?.unauthorized);
    setCollection(res.data?.collection);

    return res.data?.collection;
  };

  const createCollection = async (val: CreateCollectionInput): Promise<Collection> => {
    const res = await createCollectionMutation({ ...val });

    return res.collection;
  };

  return {
    collection,
    collections,
    createCollection,
    fetchCollection,
    fetchCollections,
    isCollectionsLoading,
    isCollectionCreating,
    isCollectionLoading,
    isUnauthorized,
  };
};

export default useCollection;
