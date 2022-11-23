import { UseQueryResult, useQuery } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';

import Settings from '@models/settings/interfaces/settings';

interface UseSettingsQueryRes {
  settings: Settings;
}

const useSettingsQuery: () => UseQueryResult<UseSettingsQueryRes> = () => {
  return useQuery(
    ['UserSettingsQuery'],
    async () => {
      const res = await Api.get<Res<Settings>>(ApiPaths.SettingsGet);

      return {
        settings: res.data.data,
      };
    },
    { retry: false, cacheTime: 0 },
  );
};

export default useSettingsQuery;
