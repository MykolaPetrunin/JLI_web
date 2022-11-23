import React, { FC } from 'react';

import useCollection from '@models/collection/useCollection';
import useCollectionsMenu from '@models/collectionsMenu/useCollectionsMenu';
import useMainMenu from '@models/mainMenu/useMainMenu';

import useCollectionsPage from '@pages/hooks/collections/useCollectionsPage';

import CollectionPageTemplate from '@templates/collectionPageTemplate/CollectionPageTemplate';

const CollectionsPage: FC = () => {
  const mainMenuProps = useMainMenu();
  const collectionTabsProps = useCollectionsMenu();
  const { fetchCollections, collections, isCollectionsLoading } = useCollection({});

  const { shareCollection, openCollection } = useCollectionsPage({
    fetchCollections,
  });

  return (
    <CollectionPageTemplate
      collections={collections}
      openCollection={openCollection}
      collectionTabsProps={collectionTabsProps}
      isCollectionsLoading={isCollectionsLoading}
      shareCollection={shareCollection}
      mainMenuProps={mainMenuProps}
    />
  );
};

export default CollectionsPage;
