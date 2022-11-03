import { Box, BoxProps, styled } from '@mui/material';

const Wrap = styled(Box)<BoxProps>(() => ({
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
}));

export default Wrap;
