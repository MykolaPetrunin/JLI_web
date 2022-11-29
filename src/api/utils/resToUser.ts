import UserRes from '@api/interfaces/userRes';
import resToWord from '@api/utils/resToWord';

import User from '@models/currentUser/interfaces/user';

const resToUser = (source: UserRes): User => ({
  // eslint-disable-next-line no-underscore-dangle
  id: source._id,
  email: source.email,
  settings: source.settings,
  wordsBaggage: source.wordsBaggage,
  firstName: source.firstName,
  lastName: source.lastName,
  collections: source.collections,
  picture: source.picture,
  wordsRepeat3Month: source.wordsRepeat3Month.map(resToWord),
  wordsRepeat6Month: source.wordsRepeat6Month.map(resToWord),
  wordsRepeatMonth: source.wordsRepeatMonth.map(resToWord),
  wordsRepeatWeek: source.wordsRepeatWeek.map(resToWord),
  wordsRepeat: source.wordsRepeat.map(resToWord),
  wordsToKnow: source.wordsToKnow.map(resToWord),
  wordsWordTranslation: source.wordsWordTranslation.map(resToWord),
  wordsTranslationWord: source.wordsTranslationWord.map(resToWord),
  wordsSpell: source.wordsSpell.map(resToWord),
});

export default resToUser;
