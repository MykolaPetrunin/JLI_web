import CurrentUserReducerType from '@store/currentUser/interfaces/currentUserReducerType';

import { CurrentUserActionsTypes } from './currentUserActions';

const currentUserReducer: CurrentUserReducerType = (state, action) => {
  const actionTypes = CurrentUserActionsTypes;

  switch (action.type) {
    case actionTypes.SetCurrentUserId:
      return {
        ...state,
        userId: action.payload,
        isLoading: false,
      };
    case actionTypes.SetCurrentUser:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.SetCurrentUserLoadingState:
      return {
        ...state,
        isLoading: action.payload,
      };
    case actionTypes.ResetCurrentUser:
      return action.payload;
    default:
      return state;
  }
};

export default currentUserReducer;
