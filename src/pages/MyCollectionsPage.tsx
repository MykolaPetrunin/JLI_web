import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import useCollection from '@models/collection/useCollection';
import useMainMenu from '@models/mainMenu/useMainMenu';

import useCollectionsPage from '@pages/hooks/collections/useCollectionsPage';

import CollectionPageTemplate from '@templates/collectionPageTemplate/CollectionPageTemplate';

import AppPaths from '@/config/appPaths';

const MyCollectionsPage: FC = () => {
  const navigate = useNavigate();

  const mainMenuProps = useMainMenu();
  // const collectionTabsProps = useCollectionsMenu();
  const { collections, isCollectionsLoading } = useCollection({ isMy: true });

  const { shareCollection, openCollection } = useCollectionsPage();

  const createCollection = () => {
    navigate(AppPaths.CollectionsCreate);
  };

  return (
    <CollectionPageTemplate
      collections={collections}
      openCollection={openCollection}
      isCollectionsLoading={isCollectionsLoading}
      createCollection={createCollection}
      shareCollection={shareCollection}
      mainMenuProps={mainMenuProps}
    />
  );
};

export default MyCollectionsPage;
