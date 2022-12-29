import { useAuth0 } from '@auth0/auth0-react';
import CurrentUserContext from '@store/currentUser/CurrentUserContext';
import { useQueryClient } from '@tanstack/react-query';
import { shuffle } from 'lodash';
import { useContext, useEffect, useState } from 'react';

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
import getWordsToStudyAmount from '@models/currentUser/utils/getWordsToStudyAmount';
import updateUserStudy from '@models/currentUser/utils/updateUserStudy';

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
  const [currentUser, setCurrentUser] = useState<User>();
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
    data: currentUserData,
    isLoading: isCurrentUserLoading,
    isFetching: isCurrentUserFetching,
  } = useCurrentUserQuery();

  useEffect(() => {
    if (!currentUserData) return;

    setCurrentUser({
      ...currentUserData,
      ...(currentUser
        ? {
            wordsToKnow: currentUser.wordsToKnow,
            wordsWordTranslation: currentUser.wordsWordTranslation,
            wordsTranslationWord: currentUser.wordsTranslationWord,
            wordsSpell: currentUser.wordsSpell,
          }
        : updateUserStudy(currentUserData)),
    });
  }, [currentUserData]);

  useEffect(() => {
    if (
      !currentUser ||
      !currentUserData ||
      getWordsToStudyAmount(currentUser) > 0 ||
      !getWordsToStudyAmount(currentUserData)
    )
      return;

    setCurrentUser({
      ...currentUser,
      ...updateUserStudy(currentUserData),
    });
  }, [currentUser]);

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

  const updateSettings = async (val: Settings): Promise<Settings> => {
    const { settings } = await updateSettingsMutation({ settings: val });

    return settings;
  };

  const setWordNextStep = async (word: Word, currentStep: WordSteps): Promise<void> => {
    if (!currentUser || currentStep === 'words') return;

    const nextStep = getNextStep(currentStep, currentUser.settings);

    // const newUser = {
    //   ...currentUser,
    //   [currentStep]: currentUser[currentStep].filter(({ id }: Word) => id !== word.id),
    //   ...(nextStep !== 'words'
    //     ? {
    //         [nextStep]: [...currentUser[nextStep], { ...word, heap: shuffle(word.heap) }],
    //       }
    //     : {}),
    // };

    // if (nextStep !== 'words') {
    //   newUser[nextStep] = [...newUser[nextStep], { ...word, heap: shuffle(word.heap) }];
    // }

    if (currentUserData) {
      queryClient.setQueryData([ApiKeys.CurrentUserKey], {
        ...currentUserData,
        [currentStep]: currentUserData[currentStep].filter(({ id }: Word) => id !== word.id),
        ...(nextStep !== 'words'
          ? {
              [nextStep]: [...currentUserData[nextStep], { ...word, heap: shuffle(word.heap) }],
            }
          : {}),
      });
    }

    setCurrentUser({
      ...currentUser,
      [currentStep]: currentUser[currentStep].filter(({ id }: Word) => id !== word.id),
      ...(nextStep !== 'words'
        ? {
            [nextStep]: [...currentUser[nextStep], { ...word, heap: shuffle(word.heap) }],
          }
        : {}),
    });

    const res = await setWordNextStepMutation({
      wordId: word.id,
      currentStep,
      heap: currentUser.wordsHeap,
    });

    queryClient.setQueryData([ApiKeys.CurrentUserKey], {
      ...currentUserData,
      ...res.data.reduce(
        (acc, item) => ({
          ...acc,
          [item.step]: item.words,
        }),
        {},
      ),
    });
  };

  const setKnownWord = async (
    word: Word,
    currentStep: WordSteps,
    isKnown: boolean,
  ): Promise<void> => {
    if (!currentUser || currentStep === 'words') return;

    queryClient.setQueryData([ApiKeys.CurrentUserKey], {
      ...currentUserData,
      [currentStep]: currentUser[currentStep].filter(({ id }: Word) => id !== word.id),
    });

    setCurrentUser({
      ...currentUser,
      [currentStep]: currentUser[currentStep].filter(({ id }: Word) => id !== word.id),
    });

    const res = await setKnownMutation({
      isKnown,
      wordId: word.id,
      currentStep,
      heap: currentUser.wordsHeap,
    });

    queryClient.setQueryData([ApiKeys.CurrentUserKey], {
      ...currentUserData,
      ...res.data.reduce(
        (acc, item) => ({
          ...acc,
          [item.step]: item.words,
        }),
        {},
      ),
    });
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
