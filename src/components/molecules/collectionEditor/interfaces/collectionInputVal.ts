import WordInputValue from '@atoms/wordInput/interfaces/WordInputValue';

interface CollectionInputVal {
  name: string;
  words: Array<WordInputValue>;
  isPrivate: boolean;
}

export default CollectionInputVal;
