import { shuffle } from 'lodash';

import UserRes from '@api/interfaces/userRes';
import resToWord from '@api/utils/resToWord';

import User from '@models/currentUser/interfaces/user';

const resToUser = (source: UserRes): User => {
  const wordsHeap = [
    ...source.wordsHeap,
    ...source.wordsRepeatHeap,
    ...source.wordsToKnow,
    ...source.wordsWordTranslation,
    ...source.wordsTranslationWord,
    ...source.wordsSpell,
  ].map(resToWord());

  return {
    // eslint-disable-next-line no-underscore-dangle
    id: source._id,
    email: source.email,
    settings: source.settings,
    wordsBaggage: source.wordsBaggage,
    firstName: source.firstName,
    lastName: source.lastName,
    collections: source.collections,
    picture: source.picture,
    wordsHeap,
    wordsRepeat3Month: shuffle(source.wordsRepeat3Month.map(resToWord())),
    wordsRepeat6Month: shuffle(source.wordsRepeat6Month.map(resToWord())),
    wordsRepeatMonth: shuffle(source.wordsRepeatMonth.map(resToWord())),
    wordsRepeatWeek: shuffle(source.wordsRepeatWeek.map(resToWord())),
    wordsRepeat: shuffle(source.wordsRepeat.map(resToWord())),
    wordsToKnow: shuffle(source.wordsToKnow.map(resToWord(wordsHeap))),
    wordsWordTranslation: shuffle(source.wordsWordTranslation.map(resToWord(wordsHeap))),
    wordsTranslationWord: shuffle(source.wordsTranslationWord.map(resToWord(wordsHeap))),
    wordsSpell: shuffle(source.wordsSpell.map(resToWord(wordsHeap))),
  };
};

export default resToUser;
