import { useAuth0 } from '@auth0/auth0-react';
import CurrentUserContext from '@store/currentUser/CurrentUserContext';
import { setCurrentUser } from '@store/currentUser/currentUserActions';
import { useContext } from 'react';

import useAddCollectionToStudyMutation from '@api/mutations/useAddCollectionToStudyMutation';
import useSetKnownMutation from '@api/mutations/useSetKnownMutation';
import useSetWordNextStepMutation from '@api/mutations/useSetWordNextStepMutation';
import useUpdateUserMutation from '@api/mutations/useUpdateUserMutation';
import useUploadImageMutation from '@api/mutations/useUploadImageMutation';
import useCurrentUserQuery from '@api/queries/useCurrentUserQuery';

import Word from '@models/collection/interfaces/word';
import User from '@models/currentUser/interfaces/user';
import WordSteps from '@models/currentUser/interfaces/wordSteps';
import getNextStep from '@models/currentUser/utils/getNextStep';

type UpdatedUser = Pick<User, 'picture' | 'firstName' | 'lastName'>;

interface UseCurrentUserRes {
  userId?: string;
  currentUser?: User;
  fetchCurrentUser: () => Promise<void>;
  logout: () => void;
  updateUser: (val: UpdatedUser) => Promise<void>;
  setKnownWord: (word: Word, currentStep: WordSteps, isKnown: boolean) => Promise<void>;
  setWordNextStep: (word: Word, currentStep: WordSteps) => Promise<void>;
  addCollectionToStudy: (collectionId: string) => Promise<void>;
  isAddingCollectionToStudy: boolean;
  isCurrentUserLoading: boolean;
}

const useCurrentUser: () => UseCurrentUserRes = () => {
  const {
    currentUserState: { userId, user: currentUser },
    dispatchCurrentUserState,
  } = useContext(CurrentUserContext);

  const { logout } = useAuth0();
  const { fetch: uploadImage } = useUploadImageMutation();
  const { fetch: updateUserMutation } = useUpdateUserMutation();
  const { fetch: setKnownMutation } = useSetKnownMutation();
  const { fetch: setWordNextStepMutation } = useSetWordNextStepMutation();
  const { fetch: addCollectionToStudyMutation, isLoading: isAddingCollectionToStudy } =
    useAddCollectionToStudyMutation();

  const { isLoading: isCurrentUserLoading, fetch: fetchCurrentUserQuery } = useCurrentUserQuery();

  const updateUser = async (val: UpdatedUser): Promise<void> => {
    let imageId = '';

    if (val.picture && val.picture !== currentUser?.picture) {
      const res = await uploadImage({ image: val.picture });
      imageId = res.imageId;
    }

    const res = await updateUserMutation({
      body: { ...val, ...(imageId !== '' ? { picture: imageId } : {}) },
    });

    dispatchCurrentUserState(setCurrentUser(res.user));
  };

  const fetchCurrentUser = async (): Promise<void> => {
    const res = await fetchCurrentUserQuery({});

    dispatchCurrentUserState(setCurrentUser(res.user));
  };

  const addCollectionToStudy = async (collectionId: string): Promise<void> => {
    await addCollectionToStudyMutation({ collectionId });
  };

  const setKnownWord = async (
    word: Word,
    currentStep: WordSteps,
    isKnown: boolean,
  ): Promise<void> => {
    if (!currentUser || currentStep === 'words') return;

    const newUser = {
      ...currentUser,
      [currentStep]: currentUser[currentStep].filter(({ id }) => id !== word.id),
    };
    if (!isKnown) {
      newUser.wordsWordTranslation = [...newUser.wordsWordTranslation, word];
    }

    dispatchCurrentUserState(setCurrentUser(newUser));

    await setKnownMutation({ isKnown, wordId: word.id, currentStep });
  };

  const setWordNextStep = async (word: Word, currentStep: WordSteps): Promise<void> => {
    if (!currentUser || currentStep === 'words') return;

    const nextStep = getNextStep(currentStep, currentUser.settings);

    const newUser = {
      ...currentUser,
      [currentStep]: currentUser[currentStep].filter(({ id }) => id !== word.id),
    };

    if (nextStep !== 'words') {
      newUser[nextStep] = [word, ...newUser[nextStep]];
    }

    dispatchCurrentUserState(setCurrentUser(newUser));

    await setWordNextStepMutation({ wordId: word.id, currentStep });
  };

  return {
    userId,
    logout,
    currentUser,
    updateUser,
    fetchCurrentUser,
    addCollectionToStudy,
    isAddingCollectionToStudy,
    isCurrentUserLoading,
    setKnownWord,
    setWordNextStep,
  };
};

export default useCurrentUser;
