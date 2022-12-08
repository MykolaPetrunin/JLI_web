import { useFormik } from 'formik';
import React, { FC, useEffect, useState } from 'react';

import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

import Word from '@models/collection/interfaces/word';

import Speech from '@atoms/speech/Speech';
import WordTypeTextField from '@atoms/wordType/components/WordTypeTextField';

interface WordTypeProps {
  word: Word;
  onSuccess: (word: Word) => void;
  onError: (word: Word) => void;
}

const WordType: FC<WordTypeProps> = ({ word, onError, onSuccess }) => {
  const theme = useTheme();
  const [typedWord, setTypedWord] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<'err' | 'ok' | undefined>();

  const formik = useFormik<{ word: string }>({
    initialValues: { word: '' },
    onSubmit: (val) => {
      setTypedWord(val.word);
    },
  });

  useEffect(() => {
    if (typedWord === undefined) return;

    setStatus(typedWord.toLowerCase().trim() === word.word.toLowerCase().trim() ? 'ok' : 'err');
  }, [typedWord]);

  const reset = () => {
    formik.resetForm();
    setTypedWord(undefined);
    setStatus(undefined);
  };

  const nextWord = () => {
    const currentStatus = status;
    reset();
    if (currentStatus === 'ok') {
      onSuccess(word);
      return;
    }

    onError(word);
  };

  const know = () => {
    reset();
    onSuccess(word);
  };

  const dontKnow = () => {
    setStatus('err');
    formik.setFieldValue('word', word.word);
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
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
        <Typography
          variant="h3"
          style={{ hyphens: 'auto', wordBreak: 'break-word' }}
          textAlign="center"
          mb={3}
        >
          {word.translation}
        </Typography>
      </Box>
      <Grid container spacing={2} pt={4}>
        <Grid item xs={12}>
          <WordTypeTextField
            value={formik.values.word}
            fullWidth
            disabled={typedWord !== undefined || status !== undefined}
            status={status}
            onChange={formik.handleChange}
            name="word"
          />
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
          {typedWord === undefined && status === undefined && (
            <Button variant="contained" fullWidth type="submit">
              Перевірити
            </Button>
          )}
          {typedWord !== undefined ||
            (status !== undefined && (
              <Button variant="contained" fullWidth onClick={nextWord}>
                Наступне слово
              </Button>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default WordType;
