import { useFormik } from 'formik';
import { isEqual } from 'lodash';
import React, { FC, useMemo } from 'react';

import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';

import SettingsEditFormData from '@atoms/settingsEdit/interfaces/settingsEditFormData';

interface SettingsEditProps {
  value: SettingsEditFormData;
  onChange: (value: SettingsEditFormData) => void;
  isUpdating: boolean;
}

const SettingsEdit: FC<SettingsEditProps> = ({ onChange, value, isUpdating }) => {
  const formik = useFormik<SettingsEditFormData>({
    initialValues: value,
    enableReinitialize: true,
    onSubmit: (val) => {
      onChange(val);
    },
  });
  const isDisabled = useMemo(
    () => isUpdating || isEqual(value, formik.values),
    [isUpdating, formik.values, value],
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} maxWidth={300}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="isWordTranslation"
                checked={formik.values.isWordTranslation}
                onChange={formik.handleChange}
              />
            }
            label="Переклад з Англійської"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="isTranslationWord"
                checked={formik.values.isTranslationWord}
                onChange={formik.handleChange}
              />
            }
            label="Переклад на Англійську"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="isTyped"
                checked={formik.values.isTyped}
                onChange={formik.handleChange}
              />
            }
            label="Правопис"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            fullWidth
            name="repeatCount"
            onChange={formik.handleChange}
            value={formik.values.repeatCount}
            inputProps={{ min: 0, max: 5 }}
            label="Кількість повторень (0-5)"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            fullWidth
            name="wordsPerDay"
            onChange={formik.handleChange}
            value={formik.values.wordsPerDay}
            inputProps={{ min: 0 }}
            label="Кількість слів в день"
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            disabled={isDisabled}
            fullWidth
            onClick={() => formik.resetForm()}
          >
            Відмінити
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" type="submit" fullWidth disabled={isDisabled}>
            Зберігти
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SettingsEdit;
