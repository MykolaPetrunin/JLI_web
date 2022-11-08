import React, { FC, MouseEvent } from 'react';

import { AddOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

import AppPaths from '@/config/appPaths';

interface CreateCollectionButtonProps {
  click: (e: MouseEvent) => void;
}

const CreateCollectionButton: FC<CreateCollectionButtonProps> = ({ click }) => {
  return (
    <Button
      href={AppPaths.CollectionsCreate}
      onClick={(e) => {
        e.preventDefault();
        click(e);
      }}
    >
      <AddOutlined /> Нова колекція
    </Button>
  );
};

export default CreateCollectionButton;
