interface Word {
  id: string;
  translation: string;
  word: string;
  image?: string;
  heap?: Word[];
}

export default Word;
