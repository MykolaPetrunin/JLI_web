import { useState } from 'react';

import QueryRes from '@api/interfaces/queryRes';

const useQuery: <Response = unknown, Request = unknown>(
  req: (request: Request) => Promise<Response>,
) => QueryRes<Response, Request> = (req) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading,
    fetch: async (props) => {
      setIsLoading(true);
      try {
        return await req(props);
      } finally {
        setIsLoading(false);
      }
    },
  };
};

export default useQuery;
