import React, { FC, useEffect, useState } from 'react';

import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

import Word from '@models/collection/interfaces/word';

import Speech from '@atoms/speech/Speech';

type Keys = 'translation' | 'word';

interface WordSelectProps {
  word: Word;
  questionKey: Keys;
  resKey: Keys;
  onSuccess: (word: Word) => void;
  onError: (word: Word) => void;
}

const WordSelect: FC<WordSelectProps> = ({ word, questionKey, resKey, onError, onSuccess }) => {
  const theme = useTheme();

  const [selectedWord, setSelectedWord] = useState<Word | undefined>();
  const [rightWord, setRightWord] = useState<Word | undefined>();

  useEffect(() => {
    setSelectedWord(undefined);
    setRightWord(undefined);
  }, [word]);

  const heapItemClickHandler = (heapWord: Word) => {
    if (rightWord) return;

    setSelectedWord(heapWord);
    setRightWord(word);
  };

  const wordColor = ({
    id: wordId,
  }: Word): 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' => {
    if (wordId === rightWord?.id) return 'success';
    if (wordId === selectedWord?.id) return 'error';
    return 'primary';
  };

  const resetState = () => {
    setSelectedWord(undefined);
    setRightWord(undefined);
  };

  const nextWord = () => {
    if (selectedWord?.id === word.id) {
      onSuccess(word);
      resetState();
      return;
    }

    onError(word);
    resetState();
  };

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
        <Typography variant="h4">{word[questionKey]}</Typography>
      </Box>
      <Grid container spacing={2}>
        {(word.heap || []).map((heapWord) => (
          <Grid item xs={6} key={heapWord.id} display="flex">
            <Button
              color={wordColor(heapWord)}
              variant={
                heapWord.id === rightWord?.id || heapWord.id === selectedWord?.id
                  ? 'contained'
                  : 'outlined'
              }
              size="small"
              fullWidth
              onClick={() => heapItemClickHandler(heapWord)}
            >
              {heapWord[resKey]}
            </Button>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Grid container spacing={2} pt={4}>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" onClick={() => setRightWord(word)}>
                Не знаю
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" fullWidth disabled={!rightWord} onClick={nextWord}>
                Наступне слово
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WordSelect;
