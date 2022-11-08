import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface WordImageProps extends BoxProps {
  src: HTMLImageElement;
}

const WordImage = styled(Box)<WordImageProps>(({ src }) => ({
  backgroundImage: src.src,
  backgroundSize: 'cover',
}));

export default WordImage;
