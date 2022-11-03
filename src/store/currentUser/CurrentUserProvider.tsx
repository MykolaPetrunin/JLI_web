import INIT_CURRENT_USER_STATE from '@store/currentUser/config/initCurrentUserState';
import currentUserReducer from '@store/currentUser/currentUserReducer';
import CurrentUserReducerType from '@store/currentUser/interfaces/currentUserReducerType';
import React, { FC, PropsWithChildren, useMemo, useReducer } from 'react';

import CurrentUserContext, { CurrentUserContextType } from './CurrentUserContext';

const CurrentUserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUserState, dispatchCurrentUserState] = useReducer<CurrentUserReducerType>(
    currentUserReducer,
    INIT_CURRENT_USER_STATE,
  );

  const contextValue = useMemo<CurrentUserContextType>(() => {
    return { currentUserState, dispatchCurrentUserState };
  }, [currentUserState, dispatchCurrentUserState]);

  return <CurrentUserContext.Provider value={contextValue}>{children}</CurrentUserContext.Provider>;
};

export default CurrentUserProvider;
