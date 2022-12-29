import User from '@models/currentUser/interfaces/user';

const getWordsToStudyAmount = (user: User): number =>
  user.wordsToKnow.length +
  user.wordsWordTranslation.length +
  user.wordsTranslationWord.length +
  user.wordsSpell.length;

export default getWordsToStudyAmount;
