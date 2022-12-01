import { useState } from 'react';

import useCreateCollectionMutation from '@api/mutations/useCreateCollection';
import useDeleteCollectionMutation from '@api/mutations/useDeleteCollectionMutation';
import useUpdateCollectionMutation from '@api/mutations/useUpdateCollection';
import useCollectionQuery from '@api/queries/useCollectionQuery';
import useCollectionsQuery from '@api/queries/useCollectionsQuery';

import Collection from '@models/collection/interfaces/collection';
import CreateCollectionInput from '@models/collection/interfaces/createCollectionInput';
import UpdateCollectionInput from '@models/collection/interfaces/updateCollectionInput';

interface UseCollectionRes {
  collection?: Collection;
  collections: Collection[];
  createCollection: (val: CreateCollectionInput) => Promise<Collection>;
  updateCollection: (updatedCollection: UpdateCollectionInput) => Promise<Collection>;
  fetchCollections: () => Promise<Collection[]>;
  fetchCollection: () => Promise<Collection | undefined>;
  deleteCollection: (collectionId: string) => Promise<string>;
  isCollectionsLoading: boolean;
  isCollectionLoading: boolean;
  isCollectionCreating: boolean;
  isCollectionUpdating: boolean;
  isCollectionDeleting: boolean;
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

  const { isLoading: isCollectionsLoading, fetch: fetchCollectionsQuery } = useCollectionsQuery();
  const { isLoading: isCollectionLoading, fetch: fetchCollectionQuery } = useCollectionQuery();

  const { mutateAsync: createCollectionMutation, isLoading: isCollectionCreating } =
    useCreateCollectionMutation();
  const { mutateAsync: updateCollectionMutation, isLoading: isCollectionUpdating } =
    useUpdateCollectionMutation();
  const { mutateAsync: deleteCollectionMutation, isLoading: isCollectionDeleting } =
    useDeleteCollectionMutation();

  const fetchCollections = async (): Promise<Collection[]> => {
    const res = await fetchCollectionsQuery({ isMy });

    setCollections(res.collections || []);

    return res.collections || [];
  };

  const fetchCollection = async (): Promise<Collection | undefined> => {
    if (!collectionId) return undefined;

    const res = await fetchCollectionQuery({ collectionId });

    setIsUnauthorized(!!res.unauthorized);
    setCollection(res.collection);

    return res.collection;
  };

  const createCollection = async (val: CreateCollectionInput): Promise<Collection> => {
    const res = await createCollectionMutation({ ...val });

    return res.collection;
  };

  const updateCollection = async (
    updatedCollection: UpdateCollectionInput,
  ): Promise<Collection> => {
    const res = await updateCollectionMutation(updatedCollection);

    return res.collection;
  };

  const deleteCollection = async (colId: string): Promise<string> => {
    const res = await deleteCollectionMutation({ collectionId: colId });

    return res.collectionId;
  };

  return {
    collection,
    collections,
    createCollection,
    fetchCollection,
    fetchCollections,
    deleteCollection,
    updateCollection,
    isCollectionsLoading,
    isCollectionCreating,
    isCollectionLoading,
    isCollectionUpdating,
    isCollectionDeleting,
    isUnauthorized,
  };
};

export default useCollection;
