import React, { FC } from 'react';

import {
  CopyAllOutlined,
  DeleteOutline,
  EditOutlined,
  LockPersonOutlined,
} from '@mui/icons-material';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';

import Collection from '@models/collection/interfaces/collection';

interface CollectionInfoProps {
  collection: Collection;
  onEdit?: () => void;
  onCopy?: () => void;
  onStartStudy?: () => void;
  onDelete?: () => void;
}

const CollectionInfo: FC<CollectionInfoProps> = ({
  collection,
  onEdit,
  onStartStudy,
  onDelete,
  onCopy,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">{collection.name}</Typography>
          <LockPersonOutlined />
        </Box>
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="center">
        {onDelete && (
          <Button fullWidth color="error" variant="outlined" onClick={onDelete}>
            <DeleteOutline />
          </Button>
        )}
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="center">
        {onEdit && (
          <Button fullWidth color="primary" variant="outlined" onClick={onEdit}>
            <EditOutlined />
          </Button>
        )}
        {onCopy && (
          <Button fullWidth color="primary" variant="outlined" onClick={onCopy}>
            <CopyAllOutlined />
          </Button>
        )}
      </Grid>
      <Grid item xs={4}>
        {onStartStudy && (
          <Button variant="contained" fullWidth onClick={onStartStudy}>
            Вивчати
          </Button>
        )}
      </Grid>
      {collection.words &&
        collection.words.map(({ word, id, translation }) => (
          <Grid item xs={12} key={id}>
            <Card>
              <CardContent>
                <Typography variant="body2" mb={1}>
                  {word}
                </Typography>
                <Typography variant="body2">{translation}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default CollectionInfo;
