import React, { FC } from 'react';

import useCurrentUser from '@models/currentUser/useCurrentUser';
import useMainMenu from '@models/mainMenu/useMainMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import Header from '@atoms/header/Header';
import Loader from '@atoms/loader/Loader';
import MainMenu from '@atoms/mainMenu/MainMenu';

import Study from '@molecules/study/Study';

const StudyPage: FC = () => {
  const mainMenuProps = useMainMenu();

  const { currentUser, isCurrentUserLoading, setKnownWord, setWordNextStep } = useCurrentUser();

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      {isCurrentUserLoading && <Loader />}
      {currentUser && (
        <Study
          onNextStep={setWordNextStep}
          onKnow={setKnownWord}
          wordsSpell={currentUser.wordsSpell}
          wordsToKnow={currentUser.wordsToKnow}
          wordsWordTranslation={currentUser.wordsWordTranslation}
          wordsTranslationWord={currentUser.wordsTranslationWord}
        />
      )}
    </MainPageTemplate>
  );
};

export default StudyPage;
