import React, { FC } from 'react';
import { useDropzone } from 'react-dropzone';

import { DriveFolderUpload } from '@mui/icons-material';
import { Typography } from '@mui/material';

import FileUploaderWrap from './FileUploaderWrap';

interface FileUploaderProps {
  onFileChange: (imageUrl: string) => void;
}

const FileUploader: FC<FileUploaderProps> = ({ onFileChange }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/png': ['.png', '.jpg', '.jpeg'] },
    onDrop: (files) => {
      if (!files[0]) return;
      onFileChange(URL.createObjectURL(files[0]));
    },
  });

  return (
    <>
      <FileUploaderWrap {...getRootProps()}>
        <DriveFolderUpload color="primary" />
        <Typography component="span" variant="body2" fontWeight="400" mt={2}>
          Drop your image here or{' '}
          <Typography component="span" variant="body2" fontWeight="400" color="primary.main">
            upload
          </Typography>
        </Typography>
      </FileUploaderWrap>
      <input {...getInputProps()} />
    </>
  );
};

export default FileUploader;
