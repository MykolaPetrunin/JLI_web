import { UseQueryResult, useQuery } from 'react-query';

import Api from '@api/services/api';

interface UseCrushesQueryRes {
  message: string;
}

const useErrorQuery: () => UseQueryResult<UseCrushesQueryRes> = () => {
  return useQuery(['ErrorQueryQuery'], async () => {
    await Api.get('/api/private');

    return {
      message: 'ok',
    };
  });
};

export default useErrorQuery;
