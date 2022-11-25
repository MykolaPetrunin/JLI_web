import { useFormik } from 'formik';
import { debounce } from 'lodash';
import React, { FC } from 'react';

import { AddOutlined } from '@mui/icons-material';
import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';

import WordInput from '@atoms/wordInput/WordInput';
import WordInputValue from '@atoms/wordInput/interfaces/WordInputValue';

import CollectionEditorValidationSchema from '@molecules/collectionEditor/validation/CollectionEditorValidationSchema';

import initCollectionInputVal from './config/initCollectionInputVal';
import CollectionInputVal from './interfaces/collectionInputVal';

interface CollectionEditorProps {
  value?: CollectionInputVal;
  onSubmit: (val: CollectionInputVal) => void;
}

const CollectionEditor: FC<CollectionEditorProps> = ({ value, onSubmit }) => {
  const formik = useFormik<CollectionInputVal>({
    initialValues: value || initCollectionInputVal,
    enableReinitialize: true,
    validateOnChange: true,
    validationSchema: CollectionEditorValidationSchema,
    onSubmit: (val) => {
      onSubmit({
        ...val,
        words: val.words.map((item) => ({
          word: item.word,
          image: item.image,
          translation: item.translation,
        })),
      });
    },
  });

  const onWordChange = debounce((word: WordInputValue, index: number) => {
    formik.setFieldValue(
      'words',
      formik.values.words.map((item, i) => (i === index ? word : item)),
    );
  }, 300);

  const addWord = () => {
    formik.setFieldValue('words', [...formik.values.words, initCollectionInputVal.words[0]]);
  };

  const removeWord = (index: number) => {
    formik.setFieldValue(
      'words',
      formik.values.words.filter((_, i) => i !== index),
    );
  };

  const errors = {
    ...(!!formik.errors.name && formik.touched.name ? { name: formik.errors.name } : {}),
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            type="text"
            fullWidth
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={!!errors.name}
            helperText={errors.name}
            label="Імʼя коллекції*"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="isPrivate"
                checked={formik.values.isPrivate}
                onChange={formik.handleChange}
              />
            }
            label="Приватна колекція"
          />
        </Grid>

        {formik.values.words.map((word, index) => (
          <Grid item xs={12} key={index}>
            <WordInput
              index={index + 1}
              touched={!!formik.touched.words}
              onChange={(val) => {
                onWordChange(
                  { word: val.word, translation: val.translation, image: val.image },
                  index,
                );
              }}
              onDelete={formik.values.words.length > 5 ? () => removeWord(index) : undefined}
              value={word}
            />
          </Grid>
        ))}
        <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
          <Button variant="text" size="large" onClick={addWord}>
            <AddOutlined /> Додати слово
          </Button>
        </Grid>
        <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
          <Button type="submit" variant="contained" size="large" fullWidth>
            {value ? 'Оновити колекцію' : 'Створити колекцію'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CollectionEditor;
