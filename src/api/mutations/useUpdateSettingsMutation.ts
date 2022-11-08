import { UseMutationResult, useMutation } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';

import Settings from '@models/settings/interfaces/settings';

interface UseUpdateSettingsMutationRes {
  settings: Settings;
}

interface UseUpdateSettingsMutationProps {
  userId: string;
  settings: Settings;
}

const useUpdateSettingsMutation: () => UseMutationResult<
  UseUpdateSettingsMutationRes,
  unknown,
  UseUpdateSettingsMutationProps
> = () => {
  return useMutation(
    async ({ userId, settings }): Promise<UseUpdateSettingsMutationRes> => {
      const res = await Api.put<Res<Settings>, Settings>({
        url: ApiPaths.updateSettings(userId),
        body: settings,
      });

      return {
        settings: res.data.data,
      };
    },
    { mutationKey: 'ClaimEventMutation' },
  );
};

export default useUpdateSettingsMutation;
