import { UseQueryResult, useQuery } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
import Res from '@api/interfaces/res';
import WordRes from '@api/interfaces/wordRes';
import Api from '@api/services/api';
import resToWord from '@api/utils/resToWord';

import Word from '@models/collection/interfaces/word';

interface UseUserWordsHeapQueryProps {
  limit?: number;
  isEnabled?: boolean;
}

interface UseUserWordsHeapQueryRes {
  words: Word[];
}

const useUserWordsHeapQuery: (
  props: UseUserWordsHeapQueryProps,
) => UseQueryResult<UseUserWordsHeapQueryRes> = ({ limit = 20, isEnabled = true }) => {
  return useQuery(
    ['UseUserWordsHeapQuery', limit, isEnabled],
    async (): Promise<UseUserWordsHeapQueryRes> => {
      const res = await Api.get<Res<WordRes[]>>(`${ApiPaths.UserWords}?limit=${limit}`);

      return {
        words: res.data.data.map(resToWord),
      };
    },
    { retry: false, cacheTime: 0, enabled: isEnabled },
  );
};

export default useUserWordsHeapQuery;
