import { useEffect, useState } from 'react';

import useCollectionsQuery from '@api/queries/useCollectionsQuery';

import Collection from '@models/collection/interfaces/collection';

interface UseCollectionRes {
  collections: Collection[];
  fetchCollections: () => void;
}

interface UseCollectionProps {
  isMultiple?: boolean;
}

const useCollection: (props: UseCollectionProps) => UseCollectionRes = ({ isMultiple = false }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isMultipleEnabled, setIsMultipleEnabled] = useState<boolean>(isMultiple);

  const { data } = useCollectionsQuery({ isEnabled: isMultipleEnabled });

  useEffect(() => {
    if (!data?.collections) return;

    setCollections(data.collections);
  }, [data]);

  const fetchCollections = () => {
    setIsMultipleEnabled(true);
  };

  return {
    collections,
    fetchCollections,
  };
};

export default useCollection;
