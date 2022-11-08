import React, { FC } from 'react';

import useCollectionsMenu from '@models/collectionsMenu/useCollectionsMenu';
import useMainMenu from '@models/mainMenu/useMainMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import Header from '@atoms/header/Header';
import MainMenu from '@atoms/mainMenu/MainMenu';
import Tabs from '@atoms/tabs/Tabs';

const MyCollectionsPage: FC = () => {
  const mainMenuProps = useMainMenu();
  const collectionTabsProps = useCollectionsMenu();

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      <Tabs {...collectionTabsProps} />
      MyCollectionsPage
    </MainPageTemplate>
  );
};

export default MyCollectionsPage;
