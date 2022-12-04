import WordRes from '@api/interfaces/wordRes';

import User from '@models/currentUser/interfaces/user';

interface UserRes
  extends Omit<
    User,
    | 'id'
    | 'words'
    | 'wordsToKnow'
    | 'wordsWordTranslation'
    | 'wordsTranslationWord'
    | 'wordsSpell'
    | 'wordsHeap'
    | 'wordsRepeat'
    | 'wordsRepeatWeek'
    | 'wordsRepeatMonth'
    | 'wordsRepeat3Month'
    | 'wordsRepeat6Month'
  > {
  _id: string;
  wordsToKnow: WordRes[];
  wordsWordTranslation: WordRes[];
  wordsTranslationWord: WordRes[];
  wordsSpell: WordRes[];
  wordsRepeat: WordRes[];
  wordsHeap: WordRes[];
  wordsRepeatHeap: WordRes[];
  wordsRepeatWeek: WordRes[];
  wordsRepeatMonth: WordRes[];
  wordsRepeat3Month: WordRes[];
  wordsRepeat6Month: WordRes[];
}

export default UserRes;
