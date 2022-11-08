import { useFormik } from 'formik';
import React, { FC, useEffect, useRef } from 'react';

import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';

import WordInput from '@atoms/wordInput/WordInput';

import initCollectionInputVal from './config/initCollectionInputVal';
import CollectionInputVal from './interfaces/collectionInputVal';

interface CollectionInputProps {
  value?: CollectionInputVal;
  onChange: (val: CollectionInputVal) => void;
}

const CollectionInput: FC<CollectionInputProps> = ({ value, onChange }) => {
  const isInit = useRef<boolean>(true);
  const formik = useFormik<CollectionInputVal>({
    initialValues: value || initCollectionInputVal,
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
    <Grid container>
      <Grid item xs={12}>
        <TextField
          type="text"
          fullWidth
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          label="Імʼя*"
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
        {formik.values.words.map((word, index) => (
          <WordInput
            key={index}
            onChange={(val) => {
              formik.setFieldValue(
                'words',
                formik.values.words.map((item, i) => (i === index ? val : item)),
              );
            }}
            value={word}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default CollectionInput;
