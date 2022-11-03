import React, { FC } from 'react';

import useMainMenu from '@hooks/useManMenu/useMainMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import Header from '@atoms/header/Header';
import MainMenu from '@atoms/mainMenu/MainMenu';

const HomePage: FC = () => {
  const mainMenuProps = useMainMenu();

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      Home page
    </MainPageTemplate>
  );
};

export default HomePage;
