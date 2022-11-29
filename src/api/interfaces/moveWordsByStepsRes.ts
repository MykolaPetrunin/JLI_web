import WordRes from '@api/interfaces/wordRes';

import WordSteps from '@models/currentUser/interfaces/wordSteps';

type MoveWordsByStepsRes = { words: WordRes[]; step: WordSteps }[];

export default MoveWordsByStepsRes;
