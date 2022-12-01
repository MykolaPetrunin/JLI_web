import ApiPaths from '@api/config/apiPaths';
import QueryRes from '@api/interfaces/queryRes';
import Res from '@api/interfaces/res';
import useQuery from '@api/queries/useQuery';
import Api from '@api/services/api';

import Settings from '@models/settings/interfaces/settings';

interface UseUpdateSettingsMutationRes {
  settings: Settings;
}

interface UseUpdateSettingsMutationProps {
  settings: Settings;
}

const useUpdateSettingsMutation: () => QueryRes<
  UseUpdateSettingsMutationRes,
  UseUpdateSettingsMutationProps
> = () => {
  return useQuery<UseUpdateSettingsMutationRes, UseUpdateSettingsMutationProps>(
    async ({ settings }): Promise<UseUpdateSettingsMutationRes> => {
      const res = await Api.put<Res<Settings>, Settings>({
        url: ApiPaths.SettingsUpdate,
        body: settings,
      });

      return {
        settings: res.data.data,
      };
    },
  );
};

export default useUpdateSettingsMutation;
