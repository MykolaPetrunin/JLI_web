interface CollectionInputVal {
  name: string;
  words: Array<{ translation: string; word: string; image?: string }>;
  isPrivate: boolean;
}

export default CollectionInputVal;
