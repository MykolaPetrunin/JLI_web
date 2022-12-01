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
  const wordsToKnow = wordsToKnowLength > wordsPerDay ? wordsPerDay : wordsToKnowLength;
  const wordsTranslationWord =
    wordsTranslationWordLength > wordsPerDay
      ? wordsPerDay
      : wordsToKnow > wordsTranslationWordLength
      ? wordsToKnow
      : wordsTranslationWordLength;
  const wordsWordTranslation =
    wordsWordTranslationLength > wordsPerDay
      ? wordsPerDay
      : wordsTranslationWord > wordsWordTranslationLength
      ? wordsTranslationWord
      : wordsWordTranslationLength;

  const wordsSpell =
    wordsSpellLength > wordsPerDay
      ? wordsPerDay
      : wordsWordTranslation > wordsSpellLength
      ? wordsWordTranslation
      : wordsSpellLength;
  return {
    wordsToKnow,
    wordsTranslationWord,
    wordsWordTranslation,
    wordsSpell,
  };
};

export default getWordsLengthConfig;
