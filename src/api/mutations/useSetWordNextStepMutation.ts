import { UseMutationResult, useMutation } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
import MoveWordsByStepsRes from '@api/interfaces/moveWordsByStepsRes';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';
import resToWord from '@api/utils/resToWord';

import Word from '@models/collection/interfaces/word';
import WordSteps from '@models/currentUser/interfaces/wordSteps';

interface UseSetWordNextStepMutationRes {
  data: { words: Word[]; step: WordSteps }[];
}

interface UseSetWordNextStepMutationProps {
  currentStep: WordSteps;
  wordId: string;
}

const useSetWordNextStepMutation: () => UseMutationResult<
  UseSetWordNextStepMutationRes,
  unknown,
  UseSetWordNextStepMutationProps
> = () => {
  return useMutation(
    async (body): Promise<UseSetWordNextStepMutationRes> => {
      const res = await Api.post<Res<MoveWordsByStepsRes>, UseSetWordNextStepMutationProps>({
        url: ApiPaths.UserWordSetNextStep,
        body,
      });

      return {
        data: res.data.data.map((item) => ({
          step: item.step,
          words: item.words.map(resToWord),
        })),
      };
    },
    { mutationKey: 'UseSetKnownMutation' },
  );
};

export default useSetWordNextStepMutation;
