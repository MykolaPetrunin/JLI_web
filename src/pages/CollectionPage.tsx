import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CircularProgress, Grid, Typography } from '@mui/material';

import useCollection from '@models/collection/useCollection';
import useCurrentUser from '@models/currentUser/useCurrentUser';
import useMainMenu from '@models/mainMenu/useMainMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import CollectionInfo from '@atoms/collectionInfo/CollectionInfo';
import Header from '@atoms/header/Header';
import MainMenu from '@atoms/mainMenu/MainMenu';

const CollectionPage: FC = () => {
  const { collectionId } = useParams<{ collectionId: 'collectionId' }>();
  const mainMenuProps = useMainMenu();

  const { collection, isCollectionLoading, fetchCollection, isUnauthorized } = useCollection({
    collectionId,
  });
  const { userId: currentUserId } = useCurrentUser();

  useEffect(() => {
    fetchCollection().then();
  }, []);

  const isMyCollection = collection?.user?.id === currentUserId;

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      <Grid container spacing={2} my={3}>
        {!isCollectionLoading && collection && (
          <Grid item xs={12} m={3}>
            <CollectionInfo
              collection={collection}
              onDelete={
                isMyCollection
                  ? () => {
                      console.log('delete');
                    }
                  : undefined
              }
              onEdit={
                isMyCollection
                  ? () => {
                      console.log('edit');
                    }
                  : undefined
              }
              onCopy={
                !isMyCollection
                  ? () => {
                      console.log('copy');
                    }
                  : undefined
              }
              onStartStudy={() => {
                console.log('start study');
              }}
            />
          </Grid>
        )}
        {!isCollectionLoading && !collection && !isUnauthorized && (
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
            <Typography>Щось пішло не так...</Typography>
            <Typography>Не знайшов такої колекції</Typography>
          </Grid>
        )}
        {!isCollectionLoading && !collection && isUnauthorized && (
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
            <Typography>Вибачте, але це приватна колекція</Typography>
          </Grid>
        )}
        {isCollectionLoading && (
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
      </Grid>
    </MainPageTemplate>
  );
};

export default CollectionPage;
