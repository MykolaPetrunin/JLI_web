import { isEqual } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CloseRounded } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

import Collection from '@models/collection/interfaces/collection';
import useCollection from '@models/collection/useCollection';
import useCurrentUser from '@models/currentUser/useCurrentUser';
import useMainMenu from '@models/mainMenu/useMainMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import CollectionInfo from '@atoms/collectionInfo/CollectionInfo';
import Header from '@atoms/header/Header';
import MainMenu from '@atoms/mainMenu/MainMenu';

import CollectionEditor from '@molecules/collectionEditor/CollectionEditor';
import CollectionInputVal from '@molecules/collectionEditor/interfaces/collectionInputVal';

import AppPaths from '@/config/appPaths';

const CollectionPage: FC = () => {
  const navigate = useNavigate();
  const [collectionToEdit, setCollectionToEdit] = useState<Collection | undefined>();
  const [isCollectionInStudy, setIsCollectionInStudy] = useState<boolean | undefined>();

  const { collectionId } = useParams<{ collectionId: 'collectionId' }>();
  const mainMenuProps = useMainMenu();

  const {
    collection,
    isCollectionLoading,
    fetchCollection,
    isUnauthorized,
    isCollectionCreating,
    isCollectionUpdating,
    isCollectionDeleting,
    updateCollection,
  } = useCollection({
    collectionId,
  });
  const { currentUser, addCollectionToStudy, isAddingCollectionToStudy } = useCurrentUser();

  useEffect(() => {
    fetchCollection().then();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    if (!collectionId || !currentUser.collections) return;

    setIsCollectionInStudy(currentUser.collections.includes(collectionId));
  }, [currentUser, collectionId]);

  const updateCol = async (newCollection: CollectionInputVal): Promise<void> => {
    if (!collection) return;

    const newVal = {
      id: collection.id,
      ...(collection.name !== newCollection.name ? { name: newCollection.name } : {}),
      ...(collection.isPrivate !== newCollection.isPrivate
        ? { isPrivate: newCollection.isPrivate }
        : {}),
      ...(!isEqual(collection.words, newCollection.words) ? { words: newCollection.words } : {}),
    };

    if (Object.keys(newVal).length === 1) return;

    setCollectionToEdit(undefined);

    await updateCollection(newVal);
  };

  const isLoading =
    isCollectionLoading ||
    isCollectionCreating ||
    isCollectionUpdating ||
    isCollectionDeleting ||
    isAddingCollectionToStudy ||
    isCollectionInStudy === undefined;

  const isContentVisible = collection && !isLoading;
  const isErrorVisible = !isUnauthorized && !collection && !isLoading;
  const isPrivateError = !collection && isUnauthorized && !isLoading;

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      <Grid container spacing={2} my={3}>
        {isContentVisible && (
          <Grid item xs={12} m={3}>
            <CollectionInfo
              collection={collection}
              isInStudy={isCollectionInStudy}
              onStartStudy={
                !isCollectionInStudy
                  ? () => {
                      if (!collection?.id) return;
                      addCollectionToStudy(collection.id).then(() => {
                        navigate(AppPaths.Home);
                      });
                    }
                  : undefined
              }
            />
          </Grid>
        )}
        {isErrorVisible && (
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
        {isPrivateError && (
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
        {isLoading && (
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
      <Dialog open={!!collectionToEdit} fullScreen>
        {!!collectionToEdit && (
          <>
            <DialogTitle variant="h6">
              Редагувати колекцію
              <IconButton
                aria-label="close"
                onClick={() => setCollectionToEdit(undefined)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseRounded />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box mt={2}>
                <CollectionEditor
                  value={{ ...collectionToEdit, words: collectionToEdit.words || [] }}
                  onSubmit={updateCol}
                />
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </MainPageTemplate>
  );
};

export default CollectionPage;
