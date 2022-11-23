import Word from '@models/collection/interfaces/word';

interface Collection {
  id: string;
  name: string;
  isPrivate: boolean;
  wordsCount?: number;
  liked?: boolean;
  user?: {
    picture: string;
    name: string;
    id: string;
  };
  words?: Word[];
}

export default Collection;
