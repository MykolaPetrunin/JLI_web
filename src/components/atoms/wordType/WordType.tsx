import { sampleSize, shuffle } from 'lodash';
import React, { FC, useEffect, useState } from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';

import Word from '@models/collection/interfaces/word';

import alphabet from '@atoms/wordType/config/alphabet';

interface WordTypeProps {
  word: Word;
  onSuccess: (word: Word) => void;
  onError: (word: Word) => void;
}

const WordType: FC<WordTypeProps> = ({ word, onError, onSuccess }) => {
  const [typedWord, setTypedWord] = useState<string>('');
  const [letters, setLetters] = useState<string[]>([]);
  const [status, setStatus] = useState<'err' | 'ok' | undefined>();

  useEffect(() => {
    const wordLetters = word.word.toLowerCase().split('');
    const alphabetLetters = sampleSize<string>(
      alphabet.filter((letter) => !wordLetters.includes(letter)),
      wordLetters.length,
    );
    setLetters(shuffle<string>([...wordLetters, ...alphabetLetters]));
  }, [word]);

  useEffect(() => {
    if (typedWord.length < word.word.length || !!status) return;

    setStatus(typedWord === word.word.toLowerCase() ? 'ok' : 'err');
  }, [typedWord]);

  const nextWord = () => {
    setLetters([]);
    setStatus(undefined);
    setTypedWord('');
    if (typedWord === word.word.toLowerCase()) {
      onSuccess(word);
      return;
    }

    onError(word);
  };

  const know = () => {
    setLetters([]);
    setStatus(undefined);
    setTypedWord('');
    onSuccess(word);
  };

  const dontKnow = () => {
    setStatus('err');
    setTypedWord(word.word.toLowerCase());
  };

  const typedColor = (): string => {
    if (!status) return 'text.primary';
    if (status === 'err') return 'error.main';
    return 'success.main';
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
        <Typography variant="h4" mb={3}>
          {word.translation}
        </Typography>
        <Typography variant="h4" color={typedColor}>
          {typedWord || ' '}
        </Typography>
      </Box>
      <Grid container spacing={2} pt={4}>
        <Grid item xs={12}>
          <Box mb={3} display="flex" alignItems="center" justifyContent="center" flexWrap="wrap">
            {letters.map((letter, i) => (
              <Box
                key={i}
                m={0.5}
                onClick={() => setTypedWord(`${typedWord}${letter.toLowerCase()}`)}
              >
                <Button disabled={status !== undefined} size="large" variant="outlined">
                  {letter}
                </Button>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            disabled={status !== undefined || !typedWord.length}
            onClick={() => setTypedWord('')}
          >
            Стерти
          </Button>
        </Grid>
        <Grid item xs={6}>
          {!status && (
            <Button fullWidth variant="contained" onClick={dontKnow}>
              Не знаю
            </Button>
          )}
          {status && (
            <Button fullWidth variant="contained" onClick={know}>
              Знаю
            </Button>
          )}
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            disabled={typedWord.length < word.word.length}
            onClick={nextWord}
          >
            Наступне слово
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WordType;
