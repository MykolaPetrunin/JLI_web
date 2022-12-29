import { UseMutationResult, useMutation } from '@tanstack/react-query';

import ApiPaths from '@api/config/apiPaths';
import ApiKeys from '@api/enums/apiKeys';
import MoveWordsByStepsRes from '@api/interfaces/moveWordsByStepsRes';
import Res from '@api/interfaces/res';
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
  heap?: Word[];
}

const useSetKnownMutation: () => UseMutationResult<
  UseSetKnownMutationRes,
  unknown,
  UseSetKnownMutationProps
> = () => {
  return useMutation({
    mutationKey: [ApiKeys.SetKnownMutation],
    mutationFn: async ({ heap, ...body }): Promise<UseSetKnownMutationRes> => {
      const res = await Api.post<Res<MoveWordsByStepsRes>, UseSetKnownMutationProps>({
        url: ApiPaths.UserWordSetKnown,
        body,
      });

      return {
        data: res.data.data.map((item) => ({
          step: item.step,
          words: item.words.map(resToWord(heap)),
        })),
      };
    },
  });
};

export default useSetKnownMutation;
