import React, { FC, LegacyRef, useState } from 'react';
import AvatarEditor, { Position } from 'react-avatar-editor';

import { Box, Slider } from '@mui/material';

interface AvatarCropperProps {
  image: string;
  cropperRef?: LegacyRef<AvatarEditor>;
}

const AvatarCropper: FC<AvatarCropperProps> = ({ image, cropperRef }) => {
  const [position, setPosition] = useState<Position>({ y: 0, x: 0 });
  const [scale, setScale] = useState<number>(1);

  return (
    <Box width={300}>
      <AvatarEditor
        ref={cropperRef}
        image={image}
        width={300}
        borderRadius={150}
        height={300}
        border={0}
        position={position}
        onPositionChange={setPosition}
        color={[0, 0, 0, 0.5]}
        scale={scale}
        rotate={0}
      />
      <Slider
        step={0.01}
        value={scale}
        onChange={(e, value) => {
          setScale(value as number);
        }}
        min={1}
        max={2}
      />
    </Box>
  );
};

export default AvatarCropper;
