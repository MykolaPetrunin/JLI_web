import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const FileUploaderWrap = styled(Box)(({ theme }) => ({
  border: `dashed 1px ${theme.palette.primary.main}`,
  borderRadius: '8px',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export default FileUploaderWrap;
