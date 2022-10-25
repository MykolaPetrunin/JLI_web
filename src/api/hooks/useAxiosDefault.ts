import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect } from 'react';

const useAxiosDefault = (): void => {
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!user || isLoading) return;
    getAccessTokenSilently().then((data) => {
      axios.defaults.headers.common.Authorization = `Bearer ${data}` || false;
    });
  }, [user, isLoading]);
};

export default useAxiosDefault;
