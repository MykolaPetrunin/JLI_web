import React, { FC, useEffect } from 'react';

import useCurrentUser from '@models/currentUser/useCurrentUser';
import useMainMenu from '@models/mainMenu/useMainMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import Header from '@atoms/header/Header';
import Loader from '@atoms/loader/Loader';
import MainMenu from '@atoms/mainMenu/MainMenu';

import Repeat from '@molecules/repeat/Repeat';

const RepeatPage: FC = () => {
  const mainMenuProps = useMainMenu();
  const { currentUser, fetchCurrentUser, isCurrentUserLoading, setKnownWord, setWordNextStep } =
    useCurrentUser();

  useEffect(() => {
    if (!isCurrentUserLoading) {
      fetchCurrentUser().then();
    }
  }, []);

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      {isCurrentUserLoading && <Loader />}
      {currentUser && (
        <Repeat
          wordsRepeat={currentUser.wordsRepeat}
          wordsRepeatWeek={currentUser.wordsRepeatWeek}
          wordsRepeatMonth={currentUser.wordsRepeatMonth}
          wordsRepeat3Month={currentUser.wordsRepeat3Month}
          wordsRepeat6Month={currentUser.wordsRepeat6Month}
          onNextStep={setWordNextStep}
          onKnow={setKnownWord}
        />
      )}
    </MainPageTemplate>
  );
};

export default RepeatPage;
