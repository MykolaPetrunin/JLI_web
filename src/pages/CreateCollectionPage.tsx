import React, { FC } from 'react';

import useMainMenu from '@models/mainMenu/useMainMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import Header from '@atoms/header/Header';
import MainMenu from '@atoms/mainMenu/MainMenu';

import CollectionInput from '@molecules/collectionInput/CollectionInput';

const CreateCollectionPage: FC = () => {
  const mainMenuProps = useMainMenu();

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      <CollectionInput onChange={(val) => console.log(val)} />
    </MainPageTemplate>
  );
};

export default CreateCollectionPage;
