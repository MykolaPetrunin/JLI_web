import React, { FC } from 'react';

import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

import Word from '@models/collection/interfaces/word';

import Speech from '@atoms/speech/Speech';

interface IsKnownWordProps {
  word: Word;
  onStudy: (word: Word) => void;
  onKnow: (word: Word) => void;
}

const IsKnownWord: FC<IsKnownWordProps> = ({ word, onStudy, onKnow }) => {
  const theme = useTheme();
  return (
    <Box
      minHeight="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      position="relative"
      px={2}
      py={3}
    >
      <Box position="absolute" top={theme.spacing(3)} right={theme.spacing(1)}>
        <Speech text={word.word} />
      </Box>
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        py={5}
      >
        <Typography variant="h3" mb={3}>
          {word.word}
        </Typography>
        <Typography variant="h4">{word.translation}</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" onClick={() => onKnow(word)}>
            Знаю
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" onClick={() => onStudy(word)}>
            Вивчати
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IsKnownWord;
