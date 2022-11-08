import React, { FC } from 'react';

import { Box } from '@mui/material';

import useCollection from '@models/collection/useCollection';
import useCollectionsMenu from '@models/collectionsMenu/useCollectionsMenu';
import useMainMenu from '@models/mainMenu/useMainMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import CreateCollectionButton from '@atoms/createCollectionButton/CreateCollectionButton';
import Header from '@atoms/header/Header';
import MainMenu from '@atoms/mainMenu/MainMenu';
import Tabs from '@atoms/tabs/Tabs';

const CollectionsPage: FC = () => {
  const mainMenuProps = useMainMenu();
  const collectionTabsProps = useCollectionsMenu();
  const { collections, goToCreateCollectionsPage } = useCollection({ isMultiple: true });

  console.log('collections', collections);

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      <Box display="flex" justifyContent="center" my={2}>
        <CreateCollectionButton click={goToCreateCollectionsPage} />
      </Box>
      <Tabs {...collectionTabsProps} />
      CollectionsPage
    </MainPageTemplate>
  );
};

export default CollectionsPage;
