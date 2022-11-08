const ApiPaths = {
  getCollections: '/api/collections',
  getCurrentUser: '/api/users/current',
  getSettings: '/api/users/settings',
  getUserId: '/api/users/id',
  updateSettings: (userId: string) => `/api/users/settings/${userId}`,
  updateUser: (userId: string) => `/api/users/${userId}`,
  uploadImage: '/api/images',
};

export default ApiPaths;
