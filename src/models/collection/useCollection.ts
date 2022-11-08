import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useCollectionsQuery from '@api/queries/useCollectionsQuery';

import Collection from '@models/collection/interfaces/collection';

import AppPaths from '@/config/appPaths';

interface UseCollectionRes {
  collections: Collection[];
  fetchCollections: () => void;
  createCollection: (val: Collection) => Promise<Collection>;
  goToCreateCollectionsPage: () => void;
}

interface UseCollectionProps {
  isMultiple?: boolean;
}

const useCollection: (props: UseCollectionProps) => UseCollectionRes = ({ isMultiple = false }) => {
  const navigate = useNavigate();
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

  const createCollection = async (val: Collection): Promise<Collection> => {
    return val;
  };

  const goToCreateCollectionsPage = () => {
    navigate(AppPaths.CollectionsCreate);
  };

  return {
    collections,
    fetchCollections,
    createCollection,
    goToCreateCollectionsPage,
  };
};

export default useCollection;
