import React, { FC, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, CircularProgress, Grid, Typography } from '@mui/material';

import useCollection from '@models/collection/useCollection';
import useCurrentUser from '@models/currentUser/useCurrentUser';
import useMainMenu from '@models/mainMenu/useMainMenu';

import useCollectionsPage from '@pages/hooks/collections/useCollectionsPage';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import CollectionCard from '@atoms/collectionCard/CollectionCard';
import Header from '@atoms/header/Header';
import MainMenu from '@atoms/mainMenu/MainMenu';

import AppPaths from '@/config/appPaths';

const HomePage: FC = () => {
  const navigate = useNavigate();
  const mainMenuProps = useMainMenu();
  const { currentUser, fetchCurrentUser } = useCurrentUser();
  const { fetchCollections, collections, isCollectionsLoading } = useCollection({});

  const { shareCollection, openCollection } = useCollectionsPage({
    fetchCollections,
  });

  useEffect(() => {
    fetchCurrentUser().then();
  }, []);

  const words = useMemo<{ toStudy: number; toRepeat: number }>(
    () => ({
      toRepeat: currentUser
        ? currentUser.wordsRepeat.length +
          currentUser.wordsRepeatWeek.length +
          currentUser.wordsRepeatMonth.length +
          currentUser.wordsRepeat3Month.length +
          currentUser.wordsRepeat6Month.length
        : 0,
      toStudy: currentUser
        ? currentUser.wordsToKnow.length +
          currentUser.wordsSpell.length +
          currentUser.wordsWordTranslation.length +
          currentUser.wordsTranslationWord.length
        : 0,
    }),
    [currentUser],
  );

  const isLoading = !currentUser || isCollectionsLoading;

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      {!isLoading && currentUser && (
        <Grid container spacing={2} px={2} my={2}>
          {!!words.toStudy && (
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={() => navigate(AppPaths.Study)}>
                Вчити({words.toStudy})
              </Button>
            </Grid>
          )}
          {!!words.toRepeat && (
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={() => navigate(AppPaths.Repeat)}>
                Повторити({words.toRepeat})
              </Button>
            </Grid>
          )}
        </Grid>
      )}
      <Grid container spacing={2} px={2} my={2}>
        {!isLoading &&
          collections.map((collection) => (
            <Grid item key={collection.id} xs={12}>
              <CollectionCard
                source={collection}
                onClick={() => openCollection(collection)}
                onShare={() => shareCollection(collection)}
              />
            </Grid>
          ))}
        {!isLoading && !collections.length && (
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
            <Typography textAlign="center" variant="h4">
              Ми активно працюємо над новими коллекціями для вас
            </Typography>
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
    </MainPageTemplate>
  );
};

export default HomePage;
