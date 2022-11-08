interface Collection {
  name: string;
  words: string;
  user?: string;
  isPrivate: boolean;
  like: number;
  disLike: number;
}

export default Collection;
