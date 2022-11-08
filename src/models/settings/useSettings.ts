import CurrentUserContext from '@store/currentUser/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';

import useUpdateSettingsMutation from '@api/mutations/useUpdateSettingsMutation';
import useSettingsQuery from '@api/queries/useSettingsQuery';

import Settings from './interfaces/settings';

interface UseSettingsRes {
  settings?: Settings;
  updateSettings: (val: Settings) => Promise<Settings>;
  isUpdating: boolean;
  isLoading: boolean;
}

const useSettings: () => UseSettingsRes = () => {
  const [settings, setSettings] = useState<Settings | undefined>();

  const { mutateAsync: updateSettingsMutation, isLoading: isUpdating } =
    useUpdateSettingsMutation();
  const {
    currentUserState: { userId },
  } = useContext(CurrentUserContext);

  const { data, isLoading } = useSettingsQuery({ userId: userId || '' });

  const updateSettings = async (val: Settings): Promise<Settings> => {
    if (!userId) return val;

    const res = await updateSettingsMutation({ userId, settings: val });

    setSettings(res.settings);

    return res.settings;
  };

  useEffect(() => {
    if (!data?.settings) return;
    setSettings(data.settings);
  }, [data]);

  return {
    settings,
    updateSettings,
    isUpdating,
    isLoading,
  };
};

export default useSettings;
