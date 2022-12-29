import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';

import Word from '@models/collection/interfaces/word';
import WordSteps from '@models/currentUser/interfaces/wordSteps';

import WordType from '@atoms/wordType/WordType';

interface RepeatProps {
  wordsRepeat: Word[];
  wordsRepeat2: Word[];
  wordsRepeat3: Word[];
  wordsRepeat4: Word[];
  wordsRepeat5: Word[];
  onKnow: (word: Word, currentStep: WordSteps, isKnown: boolean) => void;
  onNextStep: (word: Word, currentStep: WordSteps) => void;
}

const Repeat: FC<RepeatProps> = (props) => {
  const step = props.wordsRepeat.length
    ? 'wordsRepeat'
    : props.wordsRepeatWeek.length
    ? 'wordsRepeatWeek'
    : props.wordsRepeatMonth.length
    ? 'wordsRepeatMonth'
    : props.wordsRepeat3Month.length
    ? 'wordsRepeat3Month'
    : props.wordsRepeat6Month.length
    ? 'wordsRepeat6Month'
    : '';

  if (step === '')
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
          У вас немає слів до повтору
        </Typography>
      </Box>
    );

  return (
    <WordType
      word={props[step][0]}
      onSuccess={(word) => {
        props.onNextStep(word, step);
      }}
      onError={(word) => {
        props.onKnow(word, step, false);
      }}
    />
  );
};

export default Repeat;
