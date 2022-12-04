import Word from '@models/collection/interfaces/word';
import Settings from '@models/settings/interfaces/settings';

interface User {
  id: string;
  email: string;
  picture?: string;
  firstName?: string;
  lastName?: string;
  settings: Settings;
  collections?: string[];
  wordsToKnow: Word[];
  wordsWordTranslation: Word[];
  wordsTranslationWord: Word[];
  wordsHeap: Word[];
  wordsSpell: Word[];
  wordsRepeat: Word[];
  wordsRepeatWeek: Word[];
  wordsRepeatMonth: Word[];
  wordsRepeat3Month: Word[];
  wordsRepeat6Month: Word[];
  wordsBaggage: number;
}

export default User;
