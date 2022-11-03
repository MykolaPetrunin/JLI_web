import UserSettings from '@/models/users/useCurrentUser/interfaces/userSettings';

interface User {
  email: string;
  picture?: string;
  settings?: UserSettings;
  firstName?: string;
  lastName?: string;
}

export default User;
