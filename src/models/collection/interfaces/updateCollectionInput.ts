import Word from '@models/collection/interfaces/word';

interface UpdateCollectionInput {
  id: string;
  name?: string;
  words?: Array<Omit<Word, 'id'> & { id?: string }>;
  isPrivate?: boolean;
}

export default UpdateCollectionInput;
