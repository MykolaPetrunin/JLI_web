import Word from '@models/collection/interfaces/word';

interface WordRes extends Omit<Word, 'id'> {
  _id: string;
}

export default WordRes;
