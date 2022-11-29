import { shuffle } from 'lodash';
import React, { FC, useEffect, useState } from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';

import Word from '@models/collection/interfaces/word';

type Keys = 'translation' | 'word';

interface WordSelectProps {
  heap: Word[];
  word: Word;
  questionKey: Keys;
  resKey: Keys;
  onSuccess: (word: Word) => void;
  onError: (word: Word) => void;
}

const WordSelect: FC<WordSelectProps> = ({
  word,
  questionKey,
  heap,
  resKey,
  onError,
  onSuccess,
}) => {
  const [selectedWord, setSelectedWord] = useState<Word | undefined>();
  const [rightWord, setRightWord] = useState<Word | undefined>();
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    setSelectedWord(undefined);
    setRightWord(undefined);
  }, [word]);

  useEffect(() => {
    setWords(shuffle<Word>(heap));
  }, [heap]);

  const heapItemClickHandler = (heapWord: Word) => {
    if (selectedWord) return;

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

  const nextWord = () => {
    setWords([]);
    if (selectedWord?.id === word.id) {
      onSuccess(word);
      return;
    }

    onError(word);
  };

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
        <Typography variant="h4">{word[questionKey]}</Typography>
      </Box>
      <Grid container spacing={2}>
        {words.map((heapWord) => (
          <Grid item xs={6} key={heapWord.id}>
            <Button
              color={wordColor(heapWord)}
              variant="outlined"
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
