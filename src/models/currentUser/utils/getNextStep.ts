import wordStepsList from '@models/currentUser/config/wordStepsList';
import WordSteps from '@models/currentUser/interfaces/wordSteps';
import Settings from '@models/settings/interfaces/settings';

const getNextStep = (currentStep: WordSteps, settings: Settings): WordSteps => {
  const nextStep = wordStepsList[wordStepsList.indexOf(currentStep) + 1];

  switch (nextStep) {
    case 'wordsWordTranslation':
      return settings.isWordTranslation ? nextStep : getNextStep(nextStep, settings);
    case 'wordsTranslationWord':
      return settings.isTranslationWord ? nextStep : getNextStep(nextStep, settings);
    case 'wordsSpell':
      return settings.isTyped ? nextStep : getNextStep(nextStep, settings);
    default:
      return 'words';
  }
};

export default getNextStep;
