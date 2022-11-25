import Word from '@models/collection/interfaces/word';

interface CreateCollectionInput {
  id?: string;
  name: string;
  words: Array<Omit<Word, 'id'>>;
  isPrivate: boolean;
}

export default CreateCollectionInput;
