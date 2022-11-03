import INIT_CURRENT_USER_STATE from '@store/currentUser/config/initCurrentUserState';
import { noop } from 'lodash';
import { createContext } from 'react';
import CurrentUserState from 'src/store/currentUser/interfaces/currentUserState';

import { CurrentUserActions } from './currentUserActions';

export interface CurrentUserContextType {
  currentUserState: CurrentUserState;
  dispatchCurrentUserState: (action: CurrentUserActions) => void;
}

const CurrentUserContext = createContext<CurrentUserContextType>({
  dispatchCurrentUserState: noop,
  currentUserState: INIT_CURRENT_USER_STATE,
});

export default CurrentUserContext;
