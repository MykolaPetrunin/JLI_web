import React, { FC } from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';

import Word from '@models/collection/interfaces/word';

interface IsKnownWordProps {
  word: Word;
  onStudy: (word: Word) => void;
  onKnow: (word: Word) => void;
}

const IsKnownWord: FC<IsKnownWordProps> = ({ word, onStudy, onKnow }) => {
  return (
    <Box
      minHeight="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      px={2}
      py={3}
    >
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        py={5}
      >
        <Typography variant="h4" mb={3}>
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
