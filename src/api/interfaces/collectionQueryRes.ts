import WordRes from '@api/interfaces/wordRes';

import Collection from '@models/collection/interfaces/collection';

interface CollectionQueryRes extends Omit<Collection, 'id' | 'words' | 'user'> {
  _id: string;
  user?: {
    picture: string;
    name: string;
    _id: string;
  };
  words: WordRes[];
}

export default CollectionQueryRes;
