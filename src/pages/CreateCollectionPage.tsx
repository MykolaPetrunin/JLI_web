import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

import useCollection from '@models/collection/useCollection';
import useMainMenu from '@models/mainMenu/useMainMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import Header from '@atoms/header/Header';
import Loader from '@atoms/loader/Loader';
import MainMenu from '@atoms/mainMenu/MainMenu';

import CollectionEditor from '@molecules/collectionEditor/CollectionEditor';
import CollectionInputVal from '@molecules/collectionEditor/interfaces/collectionInputVal';

import AppPaths from '@/config/appPaths';

const CreateCollectionPage: FC = () => {
  const navigate = useNavigate();
  const mainMenuProps = useMainMenu();
  const { createCollection, isCollectionCreating } = useCollection({});

  const create = async (val: CollectionInputVal) => {
    await createCollection(val);
    navigate(AppPaths.CollectionsMy);
  };

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      {isCollectionCreating && <Loader />}
      {!isCollectionCreating && (
        <Box py={5} px={2}>
          <CollectionEditor onSubmit={create} />
        </Box>
      )}
    </MainPageTemplate>
  );
};

export default CreateCollectionPage;
