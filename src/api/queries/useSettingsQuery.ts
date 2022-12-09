import ApiPaths from '@api/config/apiPaths';
import QueryRes from '@api/interfaces/queryRes';
import Res from '@api/interfaces/res';
import useQuery from '@api/queries/useQuery';
import Api from '@api/services/api';

import Settings from '@models/currentUser/interfaces/settings';

interface UseSettingsQueryRes {
  settings: Settings;
}

const useSettingsQuery: () => QueryRes<UseSettingsQueryRes> = () => {
  return useQuery(async () => {
    const res = await Api.get<Res<Settings>>(ApiPaths.SettingsGet);

    return {
      settings: res.data.data,
    };
  });
};

export default useSettingsQuery;
