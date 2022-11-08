import React, { FC, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

import { Box, Button, Grid } from '@mui/material';

import AvatarCropper from '@atoms/avatarEditor/component/AvatarCropper';
import FileUploader from '@atoms/avatarEditor/component/FileUploader';

interface AvatarSelectorProps {
  onValueChange: (val?: string) => void;
}

const AvatarSelector: FC<AvatarSelectorProps> = ({ onValueChange }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const ref = useRef<AvatarEditor>(null);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {imageUrl ? (
          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <AvatarCropper image={imageUrl} cropperRef={ref} />
          </Box>
        ) : (
          <FileUploader onFileChange={(file) => setImageUrl(file)} />
        )}
      </Grid>
      <Grid item xs={6}>
        <Button variant="outlined" fullWidth color="primary" onClick={() => setImageUrl(undefined)}>
          Remove
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            onValueChange(ref.current?.getImageScaledToCanvas().toDataURL());
          }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default AvatarSelector;
