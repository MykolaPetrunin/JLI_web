import { useEffect, useState } from 'react';

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

  const { fetch: fetchSettingsQuery, isLoading } = useSettingsQuery();

  const updateSettings = async (val: Settings): Promise<Settings> => {
    const res = await updateSettingsMutation({ settings: val });

    setSettings(res.settings);

    return res.settings;
  };

  useEffect(() => {
    fetchSettingsQuery({}).then((res) => {
      setSettings(res.settings);
    });
  }, []);

  return {
    settings,
    updateSettings,
    isUpdating,
    isLoading,
  };
};

export default useSettings;
