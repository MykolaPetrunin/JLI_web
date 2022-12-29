import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';

import Word from '@models/collection/interfaces/word';
import WordSteps from '@models/currentUser/interfaces/wordSteps';

import IsKnownWord from '@atoms/isKnownWord/IsKnownWord';
import Loader from '@atoms/loader/Loader';
import WordSelect from '@atoms/wordSelect/WordSelect';
import WordType from '@atoms/wordType/WordType';

interface StudyProps {
  wordsToKnow: Word[];
  wordsWordTranslation: Word[];
  wordsTranslationWord: Word[];
  wordsSpell: Word[];
  onKnow: (word: Word, currentStep: WordSteps, isKnown: boolean) => void;
  onNextStep: (word: Word, currentStep: WordSteps) => void;
}

const Study: FC<StudyProps> = ({
  wordsToKnow,
  wordsTranslationWord,
  wordsWordTranslation,
  wordsSpell,
  onKnow,
  onNextStep,
}) => {
  if (wordsToKnow.length)
    return (
      <IsKnownWord
        word={wordsToKnow[0]}
        onKnow={(word) => {
          onKnow(word, 'wordsToKnow', true);
          // decreaseWordAmount('all');
        }}
        onStudy={(word) => {
          onNextStep(word, 'wordsToKnow');
          // decreaseWordAmount('wordsToKnow');
        }}
      />
    );

  if (wordsWordTranslation.length)
    return (
      <WordSelect
        word={wordsWordTranslation[0]}
        questionKey="word"
        resKey="translation"
        onSuccess={(word) => {
          onNextStep(word, 'wordsWordTranslation');
          // decreaseWordAmount('wordsWordTranslation');
        }}
        onError={(word) => {
          onKnow(word, 'wordsWordTranslation', false);
          // decreaseWordAmount('wordsWordTranslation', true);
        }}
      />
    );

  if (wordsTranslationWord.length)
    return (
      <WordSelect
        word={wordsTranslationWord[0]}
        questionKey="translation"
        resKey="word"
        onSuccess={(word) => {
          onNextStep(word, 'wordsTranslationWord');
          // decreaseWordAmount('wordsTranslationWord');
        }}
        onError={(word) => {
          onKnow(word, 'wordsTranslationWord', false);
          // decreaseWordAmount('wordsTranslationWord', true);
        }}
      />
    );

  if (wordsSpell.length)
    return wordsSpell[0] ? (
      <WordType
        word={wordsSpell[0]}
        onSuccess={(word) => {
          onNextStep(word, 'wordsSpell');
          // decreaseWordAmount('wordsSpell');
        }}
        onError={(word) => {
          onKnow(word, 'wordsSpell', false);
          // decreaseWordAmount('wordsSpell', true);
        }}
      />
    ) : (
      <Loader />
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
      <Typography variant="h4" textAlign="center">
        У вас немає слів до вичення
      </Typography>
    </Box>
  );
};

export default Study;
