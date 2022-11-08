import React, { FC } from 'react';

import useCollection from '@models/collection/useCollection';
import useCollectionsMenu from '@models/collectionsMenu/useCollectionsMenu';
import useMainMenu from '@models/mainMenu/useMainMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import Header from '@atoms/header/Header';
import MainMenu from '@atoms/mainMenu/MainMenu';
import Tabs from '@atoms/tabs/Tabs';

const CollectionsPage: FC = () => {
  const mainMenuProps = useMainMenu();
  const collectionTabsProps = useCollectionsMenu();
  const { collections } = useCollection({ isMultiple: true });

  console.log('collections', collections);

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      <Tabs {...collectionTabsProps} />
      CollectionsPage
    </MainPageTemplate>
  );
};

export default CollectionsPage;
