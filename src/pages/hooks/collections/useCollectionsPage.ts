import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Collection from '@models/collection/interfaces/collection';

import AppPaths from '@/config/appPaths';

interface UseCollectionsPageRes {
  shareCollection: (collection: Collection) => void;
  openCollection: (collection: Collection) => void;
}

interface UseCollectionsPageProps {
  fetchCollections: () => Promise<Collection[]>;
}

const useCollectionsPage: (props: UseCollectionsPageProps) => UseCollectionsPageRes = ({
  fetchCollections,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollections().then();
  }, []);

  const shareCollection = (collection: Collection) => {
    navigator
      .share({
        title: collection.name,
        url: AppPaths.Collection.replace(':collectionId', collection.id),
      })
      .then();
  };

  const openCollection = (collection: Collection) => {
    navigate(AppPaths.Collection.replace(':collectionId', collection.id));
  };

  return {
    shareCollection,
    openCollection,
  };
};

export default useCollectionsPage;
