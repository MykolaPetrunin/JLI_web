import { sampleSize, shuffle } from 'lodash';

import WordRes from '@api/interfaces/wordRes';

import Word from '@models/collection/interfaces/word';

const resToWord =
  (heap?: Word[]) =>
  (source: WordRes): Word => {
    const word = {
      // eslint-disable-next-line no-underscore-dangle
      id: source._id,
      word: source.word,
      translation: source.translation,
      image: source.image,
    };

    return {
      ...word,
      ...(heap
        ? {
            heap: [
              ...shuffle([
                ...sampleSize(
                  heap.filter(({ id }) => id !== word.id),
                  5,
                ),
                word,
              ]),
            ],
          }
        : {}),
    };
  };

export default resToWord;
