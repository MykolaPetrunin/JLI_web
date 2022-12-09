import WordsAmountKeys from '@molecules/study/interfaces/wordsAmountKeys';

interface GetWordsLengthConfigProps {
  wordsPerDay: number;
  wordsToKnowLength: number;
  wordsTranslationWordLength: number;
  wordsWordTranslationLength: number;
  wordsSpellLength: number;
}

const getWordsLengthConfig: (
  props: GetWordsLengthConfigProps,
) => Record<WordsAmountKeys, number> = ({
  wordsPerDay,
  wordsToKnowLength,
  wordsSpellLength,
  wordsWordTranslationLength,
  wordsTranslationWordLength,
}) => {
  const hasWordsInStudy =
    wordsSpellLength + wordsWordTranslationLength + wordsTranslationWordLength;
  const lackOfWords = wordsPerDay - hasWordsInStudy >= 0 ? wordsPerDay - hasWordsInStudy : 0;

  const wordsToKnow = hasWordsInStudy
    ? lackOfWords
    : wordsToKnowLength > wordsPerDay
    ? wordsPerDay
    : wordsToKnowLength;

  const wordsWordTranslation =
    wordsWordTranslationLength > wordsPerDay
      ? wordsPerDay
      : wordsToKnow > wordsWordTranslationLength
      ? wordsToKnow
      : wordsWordTranslationLength;

  const wordsTranslationWord =
    wordsTranslationWordLength > wordsPerDay
      ? wordsPerDay
      : wordsWordTranslation > wordsTranslationWordLength
      ? wordsWordTranslation
      : wordsTranslationWordLength;

  const wordsSpell =
    wordsSpellLength > wordsPerDay
      ? wordsPerDay
      : wordsTranslationWord > wordsSpellLength
      ? wordsTranslationWord
      : wordsSpellLength;
  return {
    wordsToKnow,
    wordsWordTranslation,
    wordsTranslationWord,
    wordsSpell,
  };
};

export default getWordsLengthConfig;
