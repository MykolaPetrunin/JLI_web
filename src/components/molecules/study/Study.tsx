import { isEqual, sampleSize } from 'lodash';
import React, { FC, useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import Word from '@models/collection/interfaces/word';
import WordSteps from '@models/currentUser/interfaces/wordSteps';

import IsKnownWord from '@atoms/isKnownWord/IsKnownWord';
import WordSelect from '@atoms/wordSelect/WordSelect';
import WordType from '@atoms/wordType/WordType';

import WordsAmountKeys from '@molecules/study/interfaces/wordsAmountKeys';
import getWordsLengthConfig from '@molecules/study/utils/getWordsAmountConfig';

interface StudyProps {
  wordsPerDay: number;
  wordsHeap: Word[];
  wordsToKnow: Word[];
  wordsWordTranslation: Word[];
  wordsTranslationWord: Word[];
  wordsSpell: Word[];
  onKnow: (word: Word, currentStep: WordSteps, isKnown: boolean) => void;
  onNextStep: (word: Word, currentStep: WordSteps) => void;
}

const Study: FC<StudyProps> = ({
  wordsPerDay,
  wordsToKnow,
  wordsTranslationWord,
  wordsWordTranslation,
  wordsSpell,
  wordsHeap,
  onKnow,
  onNextStep,
}) => {
  const [wordsAmount, setWordsAmount] = useState<Record<WordsAmountKeys, number>>(
    getWordsLengthConfig({
      wordsSpellLength: wordsSpell.length,
      wordsWordTranslationLength: wordsWordTranslation.length,
      wordsPerDay,
      wordsToKnowLength: wordsToKnow.length,
      wordsTranslationWordLength: wordsTranslationWord.length,
    }),
  );

  const decreaseWordAmount = (key: WordsAmountKeys | 'all') => {
    setWordsAmount((prevState) =>
      key === 'all'
        ? (Object.keys(prevState) as WordsAmountKeys[]).reduce(
            (acc, amountKey) => ({
              ...acc,
              [amountKey]: !prevState[amountKey] ? 0 : prevState[amountKey] - 1,
            }),
            prevState,
          )
        : {
            ...prevState,
            [key]: prevState[key] - 1,
          },
    );
  };

  useEffect(() => {
    const totalAmount = Object.values(wordsAmount).reduce<number>((acc, item) => acc + item, 0);

    if (totalAmount) return;

    const newWordsAmount = getWordsLengthConfig({
      wordsSpellLength: wordsSpell.length,
      wordsWordTranslationLength: wordsWordTranslation.length,
      wordsPerDay,
      wordsToKnowLength: wordsToKnow.length,
      wordsTranslationWordLength: wordsTranslationWord.length,
    });

    if (isEqual(newWordsAmount, wordsAmount)) return;

    setWordsAmount(newWordsAmount);
  }, [wordsAmount]);

  if (wordsAmount.wordsToKnow)
    return (
      <IsKnownWord
        word={wordsToKnow[0]}
        onKnow={(word) => {
          onKnow(word, 'wordsToKnow', true);
          decreaseWordAmount('all');
        }}
        onStudy={(word) => {
          onNextStep(word, 'wordsToKnow');
          decreaseWordAmount('wordsToKnow');
        }}
      />
    );

  if (wordsAmount.wordsWordTranslation)
    return (
      <WordSelect
        word={wordsWordTranslation[0]}
        heap={[
          wordsWordTranslation[0],
          ...sampleSize<Word>(
            wordsHeap.filter(({ id }) => id !== wordsWordTranslation[0].id),
            5,
          ),
        ]}
        questionKey="word"
        resKey="translation"
        onSuccess={(word) => {
          onNextStep(word, 'wordsWordTranslation');
          decreaseWordAmount('wordsWordTranslation');
        }}
        onError={(word) => {
          onKnow(word, 'wordsWordTranslation', false);
          decreaseWordAmount('wordsWordTranslation');
        }}
      />
    );

  if (wordsAmount.wordsTranslationWord)
    return (
      <WordSelect
        word={wordsTranslationWord[0]}
        heap={[
          wordsTranslationWord[0],
          ...sampleSize<Word>(
            wordsHeap.filter(({ id }) => id !== wordsTranslationWord[0].id),
            5,
          ),
        ]}
        questionKey="translation"
        resKey="word"
        onSuccess={(word) => {
          onNextStep(word, 'wordsTranslationWord');
          decreaseWordAmount('wordsTranslationWord');
        }}
        onError={(word) => {
          onKnow(word, 'wordsTranslationWord', false);
          decreaseWordAmount('wordsTranslationWord');
        }}
      />
    );

  if (wordsAmount.wordsSpell)
    return (
      <WordType
        word={wordsSpell[0]}
        onSuccess={(word) => {
          onNextStep(word, 'wordsSpell');
          decreaseWordAmount('wordsSpell');
        }}
        onError={(word) => {
          onKnow(word, 'wordsSpell', false);
          decreaseWordAmount('wordsSpell');
        }}
      />
    );

  return (
    <Box
      minHeight="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      px={2}
      py={3}
    >
      <Typography variant="h4">У вас немає слів до вичення</Typography>
    </Box>
  );
};

export default Study;
