import { useFormik } from 'formik';
import React, { FC, MouseEvent, useEffect, useRef } from 'react';

import { DeleteOutline } from '@mui/icons-material';
import { Box, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';

import initWordInputVal from '@atoms/wordInput/config/initWordInputVal';
import WordInputValue from '@atoms/wordInput/interfaces/WordInputValue';
import WordInputValidationSchema from '@atoms/wordInput/validation/WordInputValidationSchema';

interface WordInputProps {
  value?: WordInputValue;
  onChange: (val: WordInputValue) => void;
  onDelete?: (e: MouseEvent, val: WordInputValue) => void;
  touched?: boolean;
  index?: number;
}

const WordInput: FC<WordInputProps> = ({ value, onChange, index, onDelete, touched = false }) => {
  const isInit = useRef<boolean>(true);
  const formik = useFormik<WordInputValue>({
    initialValues: value || initWordInputVal,
    enableReinitialize: true,
    validateOnChange: true,
    validationSchema: WordInputValidationSchema,
    onSubmit: (val) => {
      onChange(val);
    },
  });

  useEffect(() => {
    if (!touched) return;
    formik.setTouched(
      Object.keys(formik.values).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    );
  }, [touched]);

  useEffect(() => {
    if (isInit.current) {
      isInit.current = false;
      return;
    }

    onChange(formik.values);
  }, [formik.values]);

  const errors = {
    ...(!!formik.errors.word && formik.touched.word ? { word: formik.errors.word } : {}),
    ...(!!formik.errors.translation && formik.touched.translation
      ? { translation: formik.errors.translation }
      : {}),
  };

  return (
    <Paper elevation={2}>
      <Box position="relative" display="flex" alignItems="center" justifyContent="space-between">
        <Grid container spacing={2} p={2} flex="1">
          <Grid item xs={12}>
            <TextField
              type="text"
              fullWidth
              name="word"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.word}
              error={!!errors.word}
              helperText={errors.word}
              label="Слово або фраза*"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              fullWidth
              name="translation"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.translation}
              error={!!errors.translation}
              helperText={errors.translation}
              label="Переклад*"
            />
          </Grid>
        </Grid>
        {onDelete && (
          <Box>
            <IconButton onClick={(e) => onDelete(e, formik.values)}>
              <DeleteOutline />
            </IconButton>
          </Box>
        )}
        {index && (
          <Typography
            position="absolute"
            color="text.disabled"
            variant="caption"
            bottom={0}
            right={4}
          >
            {index}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default WordInput;
