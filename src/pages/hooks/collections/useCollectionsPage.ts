import { useNavigate } from 'react-router-dom';

import Collection from '@models/collection/interfaces/collection';

import AppPaths from '@/config/appPaths';

interface UseCollectionsPageRes {
  shareCollection: (collection: Collection) => void;
  openCollection: (collection: Collection) => void;
}

const useCollectionsPage: () => UseCollectionsPageRes = () => {
  const navigate = useNavigate();

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
