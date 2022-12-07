import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

type WordTypeTextFieldProps = TextFieldProps & {
  status?: 'ok' | 'err';
};

const WordTypeTextField = styled(TextField)<WordTypeTextFieldProps>(({ theme, status }) => ({
  '& .MuiOutlinedInput-root.Mui-disabled': {
    '.Mui-disabled': {
      WebkitTextFillColor: status === 'ok' ? theme.palette.success.main : theme.palette.error.main,
    },
  },
}));

export default WordTypeTextField;
