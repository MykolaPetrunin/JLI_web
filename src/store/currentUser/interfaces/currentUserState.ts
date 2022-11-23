import User from '@models/currentUser/interfaces/user';

interface CurrentUserState {
  userId?: string;
  user?: User;
  isLoading: boolean;
}

export default CurrentUserState;
