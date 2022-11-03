import { CurrentUserActions } from '@store/currentUser/currentUserActions';
import CurrentUserState from '@store/currentUser/interfaces/currentUserState';
import { Reducer } from 'react';

type CurrentUserReducerType = Reducer<CurrentUserState, CurrentUserActions>;

export default CurrentUserReducerType;
