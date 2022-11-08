import { useFormik } from 'formik';
import React, { FC, useEffect, useRef } from 'react';

import { Grid, Paper, TextField } from '@mui/material';

import initWordInputVal from '@atoms/wordInput/config/initWordInputVal';
import WordInputValue from '@atoms/wordInput/interfaces/WordInputValue';

interface WordInputProps {
  value?: WordInputValue;
  onChange: (val: WordInputValue) => void;
}

const WordInput: FC<WordInputProps> = ({ value, onChange }) => {
  const isInit = useRef<boolean>(true);
  const formik = useFormik<WordInputValue>({
    initialValues: value || initWordInputVal,
    enableReinitialize: true,
    onSubmit: (val) => {
      onChange(val);
    },
  });

  useEffect(() => {
    if (isInit.current) {
      isInit.current = false;
      return;
    }

    onChange(formik.values);
  }, [formik.values]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              type="text"
              fullWidth
              name="word"
              onChange={formik.handleChange}
              value={formik.values.word}
              label="Слово або фраза*"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              fullWidth
              name="translation"
              onChange={formik.handleChange}
              value={formik.values.translation}
              label="Переклад*"
            />
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default WordInput;
