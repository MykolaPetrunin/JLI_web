import mainTheme from '../src/theme/mainTheme';
import { muiTheme } from 'storybook-addon-material-ui5'

export const decorators = [
    muiTheme(mainTheme)
];
