import { useAuth0 } from '@auth0/auth0-react';
import CurrentUserContext from '@store/currentUser/CurrentUserContext';
import { useQueryClient } from '@tanstack/react-query';
import { shuffle } from 'lodash';
import { useContext } from 'react';

import ApiKeys from '@api/enums/apiKeys';
import useAddCollectionToStudyMutation from '@api/mutations/useAddCollectionToStudyMutation';
import useSetKnownMutation from '@api/mutations/useSetKnownMutation';
import useSetWordNextStepMutation from '@api/mutations/useSetWordNextStepMutation';
import useUpdateSettingsMutation from '@api/mutations/useUpdateSettingsMutation';
import useUpdateUserMutation from '@api/mutations/useUpdateUserMutation';
import useUploadImageMutation from '@api/mutations/useUploadImageMutation';
import useCurrentUserQuery from '@api/queries/useCurrentUserQuery';

import Word from '@models/collection/interfaces/word';
import Settings from '@models/currentUser/interfaces/settings';
import User from '@models/currentUser/interfaces/user';
import WordSteps from '@models/currentUser/interfaces/wordSteps';
import getNextStep from '@models/currentUser/utils/getNextStep';

type UpdatedUser = Pick<User, 'picture' | 'firstName' | 'lastName'>;

interface UseCurrentUserRes {
  userId?: string;
  currentUser?: User;
  updateSettings: (val: Settings) => Promise<Settings>;
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
    currentUserState: { userId },
  } = useContext(CurrentUserContext);

  const { logout } = useAuth0();
  const queryClient = useQueryClient();

  const { mutateAsync: uploadImage } = useUploadImageMutation();
  const { mutateAsync: updateUserMutation } = useUpdateUserMutation();
  const { mutateAsync: setKnownMutation } = useSetKnownMutation();
  const { mutateAsync: setWordNextStepMutation } = useSetWordNextStepMutation();
  const { mutateAsync: updateSettingsMutation, isLoading: isUpdating } =
    useUpdateSettingsMutation();
  const { mutateAsync: addCollectionToStudyMutation, isLoading: isAddingCollectionToStudy } =
    useAddCollectionToStudyMutation();

  const {
    data: currentUser,
    isLoading: isCurrentUserLoading,
    isFetching: isCurrentUserFetching,
  } = useCurrentUserQuery();

  const updateUser = async (val: UpdatedUser): Promise<void> => {
    let imageId = '';

    if (val.picture && val.picture !== currentUser?.picture) {
      const res = await uploadImage({ image: val.picture });
      imageId = res.imageId;
    }

    await updateUserMutation({
      body: { ...val, ...(imageId !== '' ? { picture: imageId } : {}) },
    });
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
      [currentStep]: currentUser[currentStep].filter(({ id }: Word) => id !== word.id),
    };

    if (!isKnown) {
      newUser.wordsWordTranslation = [
        ...newUser.wordsWordTranslation,
        { ...word, heap: shuffle(word.heap) },
      ];
    }

    queryClient.setQueryData([ApiKeys.CurrentUserKey], newUser);

    await setKnownMutation({ isKnown, wordId: word.id, currentStep });
  };

  const updateSettings = async (val: Settings): Promise<Settings> => {
    const { settings } = await updateSettingsMutation({ settings: val });

    return settings;
  };

  const setWordNextStep = async (word: Word, currentStep: WordSteps): Promise<void> => {
    if (!currentUser || currentStep === 'words') return;

    const nextStep = getNextStep(currentStep, currentUser.settings);

    const newUser = {
      ...currentUser,
      [currentStep]: currentUser[currentStep].filter(({ id }: Word) => id !== word.id),
    };

    if (nextStep !== 'words') {
      newUser[nextStep] = [...newUser[nextStep], { ...word, heap: shuffle(word.heap) }];
    }

    queryClient.setQueryData([ApiKeys.CurrentUserKey], newUser);

    await setWordNextStepMutation({ wordId: word.id, currentStep });
  };

  return {
    userId,
    logout,
    currentUser,
    updateUser,
    updateSettings,
    addCollectionToStudy,
    isAddingCollectionToStudy,
    isCurrentUserLoading: isCurrentUserFetching || isCurrentUserLoading || isUpdating,
    setKnownWord,
    setWordNextStep,
  };
};

export default useCurrentUser;
