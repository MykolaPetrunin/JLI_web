import Word from '@models/collection/interfaces/word';

interface CreateCollectionInput {
  name: string;
  words: Array<Omit<Word, 'id'>>;
  isPrivate: boolean;
}

export default CreateCollectionInput;
