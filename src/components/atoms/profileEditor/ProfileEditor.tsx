import { useFormik } from 'formik';
import { isEqual } from 'lodash';
import React, { FC, useMemo } from 'react';

import { Button, Grid, TextField } from '@mui/material';

import AvatarEditor from '@atoms/avatarEditor/AvatarEditor';
import ProfileEditorFormData from '@atoms/profileEditor/interfaces/profileEditorFormData';

interface ProfileEditorProps {
  value: ProfileEditorFormData;
  onChange: (val: ProfileEditorFormData) => void;
  isUpdating: boolean;
}

const ProfileEditor: FC<ProfileEditorProps> = ({ onChange, value, isUpdating }) => {
  const formik = useFormik<ProfileEditorFormData>({
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
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" alignItems="center" flexDirection="column">
          <AvatarEditor
            onValueChange={(val) => {
              formik.setFieldValue('picture', val);
            }}
            value={formik.values.picture}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={formik.values.firstName}
            label="Імʼя"
            name="firstName"
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={formik.values.lastName}
            label="Прізвище"
            name="lastName"
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            disabled={isDisabled}
            variant="outlined"
            onClick={() => formik.resetForm()}
            size="large"
          >
            Відмінити
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth disabled={isDisabled} variant="contained" type="submit" size="large">
            Зберігти
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileEditor;
