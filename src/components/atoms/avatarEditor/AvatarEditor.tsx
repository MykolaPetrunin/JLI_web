import React, { FC } from 'react';

import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
} from '@mui/material';

import AvatarSelector from '@atoms/avatarEditor/component/AvatarSelector';
import LargeAvatar from '@atoms/avatarEditor/component/LargeAvatar';

interface AvatarEditorProps {
  value?: string;
  isLoading?: boolean;
  onValueChange: (val?: string) => void;
}

const AvatarEditor: FC<AvatarEditorProps> = ({ onValueChange, value, isLoading = false }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box width={140}>
      {isLoading ? (
        <Box width={140} height={140} display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <LargeAvatar src={value} />
      )}

      <Box mt={1} textAlign="center">
        <Button
          size="small"
          color="primary"
          disabled={isLoading}
          variant="text"
          onClick={() => setOpen(true)}
        >
          Change image
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle
          variant="h6"
          fontWeight="700"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          Change image
          <IconButton size="small" onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <Box my={3} mx={2}>
          <AvatarSelector
            onValueChange={(data) => {
              onValueChange(data);
              setOpen(false);
            }}
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default AvatarEditor;
