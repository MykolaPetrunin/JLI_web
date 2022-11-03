import INIT_CURRENT_USER_STATE from '@store/currentUser/config/initCurrentUserState';
import actionFn from '@store/utils/actionFn';
import CurrentUserState from 'src/store/currentUser/interfaces/currentUserState';

export enum CurrentUserActionsTypes {
  SetCurrentUserId = 'SetCurrentUserId',
  SetCurrentUserLoadingState = 'SetCurrentUserLoadingState',
  ResetCurrentUser = 'ResetCurrentUser',
}

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
  | SetCurrentUserLoadingStateAction;
