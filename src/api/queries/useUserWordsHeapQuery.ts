import ApiPaths from '@api/config/apiPaths';
import QueryRes from '@api/interfaces/queryRes';
import Res from '@api/interfaces/res';
import WordRes from '@api/interfaces/wordRes';
import useQuery from '@api/queries/useQuery';
import Api from '@api/services/api';
import resToWord from '@api/utils/resToWord';

import Word from '@models/collection/interfaces/word';

interface UseUserWordsHeapQueryProps {
  limit?: number;
}

interface UseUserWordsHeapQueryRes {
  words: Word[];
}

const useUserWordsHeapQuery: () => QueryRes<
  UseUserWordsHeapQueryRes,
  UseUserWordsHeapQueryProps
> = () => {
  return useQuery<UseUserWordsHeapQueryRes, UseUserWordsHeapQueryProps>(
    async ({ limit }): Promise<UseUserWordsHeapQueryRes> => {
      const res = await Api.get<Res<WordRes[]>>(`${ApiPaths.UserWords}?limit=${limit}`);

      return {
        words: res.data.data.map(resToWord),
      };
    },
  );
};

export default useUserWordsHeapQuery;
