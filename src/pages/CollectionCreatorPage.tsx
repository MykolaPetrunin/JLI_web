import { useFormik } from 'formik';
import React, { FC, useEffect, useState } from 'react';

import { Box, Grid, TextField } from '@mui/material';

import useMainMenu from '@models/mainMenu/useMainMenu';

import MainPageTemplate from '@templates/mainPageTemplate/MainPageTemplate';

import Header from '@atoms/header/Header';
import MainMenu from '@atoms/mainMenu/MainMenu';

const CollectionCreatorPage: FC = () => {
  const mainMenuProps = useMainMenu();
  const [result, setResult] = useState<string>('');

  const formatData = (source: string) => {
    try {
      const items = source.split('\n');
      const res = items.reduce<{ words: { word: string; translation: string }[] }>(
        (acc, elem) => {
          const val = elem.split('::');
          if (val.length !== 2 || val[0].trim() === '' || val[1].trim() === '') return acc;
          return { ...acc, words: [...acc.words, { word: val[0], translation: val[1] }] };
        },
        { words: [] },
      );

      setResult(JSON.stringify(res.words, null, 2));
    } catch {
      setResult('');
    }
  };

  const formik = useFormik<{ source: string }>({
    initialValues: { source: '' },
    onSubmit: (val) => {
      formatData(val.source);
    },
  });

  useEffect(() => {
    formatData(formik.values.source);
  }, [formik.values.source]);

  return (
    <MainPageTemplate header={<Header />} footer={<MainMenu {...mainMenuProps} />}>
      <Grid container>
        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              maxRows={5}
              fullWidth
              value={formik.values.source}
              name="source"
              onChange={formik.handleChange}
              multiline
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          <Box whiteSpace="pre" style={{ userSelect: 'all' }}>
            {result}
          </Box>
        </Grid>
      </Grid>
    </MainPageTemplate>
  );
};

export default CollectionCreatorPage;
