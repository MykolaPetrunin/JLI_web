import Word from '@models/collection/interfaces/word';
import Settings from '@models/currentUser/interfaces/settings';

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
  wordsRepeat2: Word[];
  wordsRepeat3: Word[];
  wordsRepeat4: Word[];
  wordsRepeat5: Word[];
  wordsBaggage: number;
}

export default User;
