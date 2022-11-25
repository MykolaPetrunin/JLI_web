import React, { FC } from 'react';

import { Box, CircularProgress, Grid, Typography } from '@mui/material';

import Collection from '@models/collection/interfaces/collection';
import { UseMainMenuRes } from '@models/mainMenu/useMainMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import CollectionCard from '@atoms/collectionCard/CollectionCard';
import CreateCollectionButton from '@atoms/createCollectionButton/CreateCollectionButton';
import Header from '@atoms/header/Header';
import MainMenu from '@atoms/mainMenu/MainMenu';

interface CollectionPageTemplateProps {
  mainMenuProps: UseMainMenuRes;
  createCollection?: () => void;
  collections: Collection[];
  isCollectionsLoading: boolean;
  openCollection: (collection: Collection) => void;
  shareCollection: (collection: Collection) => void;
}

const CollectionPageTemplate: FC<CollectionPageTemplateProps> = ({
  mainMenuProps,
  createCollection,
  collections,
  isCollectionsLoading,
  openCollection,
  shareCollection,
}) => {
  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      {createCollection && (
        <Box display="flex" justifyContent="center" my={2}>
          <CreateCollectionButton click={createCollection} />
        </Box>
      )}
      <Grid container spacing={2} px={2} my={2}>
        {collections.map((collection) => (
          <Grid item key={collection.id} xs={12}>
            <CollectionCard
              source={collection}
              onClick={() => openCollection(collection)}
              onShare={() => shareCollection(collection)}
            />
          </Grid>
        ))}
        {isCollectionsLoading && (
          <Grid
            item
            key="emptyState"
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            p={3}
          >
            <CircularProgress />
          </Grid>
        )}
        {collections.length === 0 && !isCollectionsLoading && (
          <Grid
            item
            key="emptyState"
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            p={3}
          >
            <Typography>Схоже ви вивчаєте всі колекції</Typography>
            <Typography>Ми активно працюємо над новими</Typography>
          </Grid>
        )}
      </Grid>
    </MainPageTemplate>
  );
};

export default CollectionPageTemplate;
