import WordRes from '@api/interfaces/wordRes';

import Word from '@models/collection/interfaces/word';

const resToWord = (source: WordRes): Word => ({
  word: source.word,
  translation: source.translation,
  image: source.image,
  // eslint-disable-next-line no-underscore-dangle
  id: source._id,
});

export default resToWord;
