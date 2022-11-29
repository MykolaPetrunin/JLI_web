import { uniqBy } from 'lodash';
import React, { FC, useEffect, useState } from 'react';

import Word from '@models/collection/interfaces/word';
import useCurrentUser from '@models/currentUser/useCurrentUser';
import useMainMenu from '@models/mainMenu/useMainMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import Header from '@atoms/header/Header';
import Loader from '@atoms/loader/Loader';
import MainMenu from '@atoms/mainMenu/MainMenu';

import Study from '@molecules/study/Study';

const StudyPage: FC = () => {
  const mainMenuProps = useMainMenu();
  const [wordsHeap, setWordsHeap] = useState<Word[]>([]);
  const {
    currentUser,
    fetchCurrentUser,
    isCurrentUserLoading,
    wordsHeap: currentUserWordsHeap,
    setKnownWord,
    setWordNextStep,
  } = useCurrentUser();

  useEffect(() => {
    if (!currentUser) return;
    const words = [
      ...currentUser.wordsToKnow,
      ...currentUser.wordsWordTranslation,
      ...currentUser.wordsTranslationWord,
      ...currentUser.wordsSpell,
      ...currentUser.wordsRepeat,
      ...currentUser.wordsRepeatWeek,
      ...currentUser.wordsRepeatMonth,
      ...currentUser.wordsRepeat3Month,
      ...currentUser.wordsRepeat6Month,
    ];
    setWordsHeap(uniqBy([...wordsHeap, ...words], 'id'));
  }, [currentUser]);

  useEffect(() => {
    setWordsHeap((prevState) => uniqBy([...prevState, ...currentUserWordsHeap], 'id'));
  }, [currentUserWordsHeap]);

  useEffect(() => {
    if (!isCurrentUserLoading) {
      fetchCurrentUser().then();
    }
  }, []);

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      {isCurrentUserLoading && <Loader />}
      {currentUser && (
        <Study
          onNextStep={setWordNextStep}
          onKnow={setKnownWord}
          wordsPerDay={currentUser.settings.wordsPerDay}
          wordsHeap={wordsHeap}
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
