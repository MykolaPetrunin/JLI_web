import ApiPaths from '@api/config/apiPaths';
import MoveWordsByStepsRes from '@api/interfaces/moveWordsByStepsRes';
import QueryRes from '@api/interfaces/queryRes';
import Res from '@api/interfaces/res';
import useQuery from '@api/queries/useQuery';
import Api from '@api/services/api';
import resToWord from '@api/utils/resToWord';

import Word from '@models/collection/interfaces/word';
import WordSteps from '@models/currentUser/interfaces/wordSteps';

interface UseSetKnownMutationRes {
  data: { words: Word[]; step: WordSteps }[];
}

interface UseSetKnownMutationProps {
  currentStep: WordSteps;
  wordId: string;
  isKnown: boolean;
}

const useSetKnownMutation: () => QueryRes<
  UseSetKnownMutationRes,
  UseSetKnownMutationProps
> = () => {
  return useQuery<UseSetKnownMutationRes, UseSetKnownMutationProps>(
    async (body): Promise<UseSetKnownMutationRes> => {
      const res = await Api.post<Res<MoveWordsByStepsRes>, UseSetKnownMutationProps>({
        url: ApiPaths.UserWordSetKnown,
        body,
      });

      return {
        data: res.data.data.map((item) => ({
          step: item.step,
          words: item.words.map(resToWord),
        })),
      };
    },
  );
};

export default useSetKnownMutation;
