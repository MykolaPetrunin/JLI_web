import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

import ApiPaths from '@api/config/apiPaths';
import ApiKeys from '@api/enums/apiKeys';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';

import Settings from '@models/currentUser/interfaces/settings';

interface UseUpdateSettingsMutationRes {
  settings: Settings;
}

interface UseUpdateSettingsMutationProps {
  settings: Settings;
}

const useUpdateSettingsMutation: () => UseMutationResult<
  UseUpdateSettingsMutationRes,
  unknown,
  UseUpdateSettingsMutationProps
> = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ApiKeys.UpdateUserSettings],
    mutationFn: async ({ settings }): Promise<UseUpdateSettingsMutationRes> => {
      const res = await Api.put<Res<Settings>, Settings>({
        url: ApiPaths.SettingsUpdate,
        body: settings,
      });

      return {
        settings: res.data.data,
      };
    },
    onSuccess: (data) => {
      queryClient.setQueryData([ApiKeys.CurrentUserKey], (user) =>
        user ? { ...user, settings: data.settings } : undefined,
      );
    },
  });
};

export default useUpdateSettingsMutation;
