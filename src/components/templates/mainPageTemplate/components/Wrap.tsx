import { Box, BoxProps, styled } from '@mui/material';

const Wrap = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100%',
  display: 'grid',
  color: theme.palette.text.primary,
  gridTemplateRows: 'auto 1fr auto',
  background: theme.palette.background.default,
}));

export default Wrap;
