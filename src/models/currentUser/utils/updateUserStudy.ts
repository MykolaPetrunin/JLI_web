import Word from '@models/collection/interfaces/word';
import User from '@models/currentUser/interfaces/user';

const getWordsSlice = (words: Word[], wordsAmount: number): Word[] =>
  words.length > wordsAmount ? words.slice(0, wordsAmount) : words;
const updateUserStudy = (
  user: User,
): Pick<User, 'wordsToKnow' | 'wordsWordTranslation' | 'wordsTranslationWord' | 'wordsSpell'> => {
  let wordsToLearn = user.settings.wordsPerDay || 5;

  const wordsSpell = getWordsSlice(user.wordsSpell, wordsToLearn);
  wordsToLearn -= wordsSpell.length;

  const wordsTranslationWord = getWordsSlice(user.wordsTranslationWord, wordsToLearn);
  wordsToLearn -= wordsTranslationWord.length;

  const wordsWordTranslation = getWordsSlice(user.wordsWordTranslation, wordsToLearn);
  wordsToLearn -= wordsWordTranslation.length;

  const wordsToKnow = getWordsSlice(user.wordsToKnow, wordsToLearn);

  return {
    wordsToKnow,
    wordsWordTranslation,
    wordsTranslationWord,
    wordsSpell,
  };
};

export default updateUserStudy;
