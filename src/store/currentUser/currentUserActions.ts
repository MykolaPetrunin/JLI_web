import INIT_CURRENT_USER_STATE from '@store/currentUser/config/initCurrentUserState';
import actionFn from '@store/utils/actionFn';
import CurrentUserState from 'src/store/currentUser/interfaces/currentUserState';

import User from '@models/currentUser/interfaces/user';

export enum CurrentUserActionsTypes {
  SetCurrentUserId = 'SetCurrentUserId',
  SetCurrentUser = 'SetCurrentUser',
  SetCurrentUserLoadingState = 'SetCurrentUserLoadingState',
  ResetCurrentUser = 'ResetCurrentUser',
}

export interface SetCurrentUserAction {
  type: CurrentUserActionsTypes.SetCurrentUser;
  payload: User;
}

export const setCurrentUser = actionFn<SetCurrentUserAction>(
  CurrentUserActionsTypes.SetCurrentUser,
);

export interface SetCurrentUserIdAction {
  type: CurrentUserActionsTypes.SetCurrentUserId;
  payload: string;
}

export const setCurrentUserId = actionFn<SetCurrentUserIdAction>(
  CurrentUserActionsTypes.SetCurrentUserId,
);

export interface SetCurrentUserLoadingStateAction {
  type: CurrentUserActionsTypes.SetCurrentUserLoadingState;
  payload: boolean;
}

export const setCurrentUserLoadingState = actionFn<SetCurrentUserLoadingStateAction>(
  CurrentUserActionsTypes.SetCurrentUserLoadingState,
);

export interface ResetCurrentUserAction {
  type: CurrentUserActionsTypes.ResetCurrentUser;
  payload: CurrentUserState;
}

export const resetCurrentUser = (): ResetCurrentUserAction => ({
  type: CurrentUserActionsTypes.ResetCurrentUser,
  payload: INIT_CURRENT_USER_STATE,
});

export type CurrentUserActions =
  | SetCurrentUserIdAction
  | ResetCurrentUserAction
  | SetCurrentUserAction
  | SetCurrentUserLoadingStateAction;
