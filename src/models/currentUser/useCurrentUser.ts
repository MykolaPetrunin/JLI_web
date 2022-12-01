import { useAuth0 } from '@auth0/auth0-react';
import CurrentUserContext from '@store/currentUser/CurrentUserContext';
import { setCurrentUser } from '@store/currentUser/currentUserActions';
import { useContext, useEffect, useState } from 'react';

import useAddCollectionToStudyMutation from '@api/mutations/useAddCollectionToStudyMutation';
import useSetKnownMutation from '@api/mutations/useSetKnownMutation';
import useSetWordNextStepMutation from '@api/mutations/useSetWordNextStepMutation';
import useUpdateUserMutation from '@api/mutations/useUpdateUserMutation';
import useUploadImageMutation from '@api/mutations/useUploadImageMutation';
import useCurrentUserQuery from '@api/queries/useCurrentUserQuery';
import useUserWordsHeapQuery from '@api/queries/useUserWordsHeapQuery';

import Word from '@models/collection/interfaces/word';
import User from '@models/currentUser/interfaces/user';
import WordSteps from '@models/currentUser/interfaces/wordSteps';

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
  wordsHeap: Word[];
}

const useCurrentUser: () => UseCurrentUserRes = () => {
  const [wordsHeap, setWordsHeap] = useState<Word[]>([]);
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

  const { fetch: fetchUserWordsHeapQuery } = useUserWordsHeapQuery();
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

  useEffect(() => {
    fetchUserWordsHeapQuery({ limit: 20 }).then((res) => {
      setWordsHeap(res.words);
    });
  }, []);

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
    if (!currentUser) return;

    if (currentStep === 'wordsWordTranslation' && !isKnown) {
      dispatchCurrentUserState(
        setCurrentUser({
          ...currentUser,
          [currentStep]: [...currentUser[currentStep].filter(({ id }) => id !== word.id), word],
        }),
      );
      return;
    }

    if (currentStep !== 'words') {
      dispatchCurrentUserState(
        setCurrentUser({
          ...currentUser,
          [currentStep]: [...currentUser[currentStep].filter(({ id }) => id !== word.id)],
        }),
      );
    }

    const res = await setKnownMutation({ isKnown, wordId: word.id, currentStep });
    dispatchCurrentUserState(
      setCurrentUser({
        ...currentUser,
        ...res.data.reduce((acc, { words, step }) => {
          return { ...acc, [step]: words };
        }, {}),
      }),
    );
  };

  const setWordNextStep = async (word: Word, currentStep: WordSteps): Promise<void> => {
    if (!currentUser) return;

    if (currentStep !== 'words') {
      dispatchCurrentUserState(
        setCurrentUser({
          ...currentUser,
          [currentStep]: [...currentUser[currentStep].filter(({ id }) => id !== word.id)],
        }),
      );
    }

    const res = await setWordNextStepMutation({ wordId: word.id, currentStep });

    dispatchCurrentUserState(
      setCurrentUser({
        ...currentUser,
        ...res.data.reduce((acc, { words, step }) => {
          return { ...acc, [step]: words };
        }, {}),
      }),
    );
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
    wordsHeap,
    setKnownWord,
    setWordNextStep,
  };
};

export default useCurrentUser;
