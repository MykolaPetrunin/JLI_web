import { UseMutationResult, useMutation } from 'react-query';

import ApiPaths from '@api/config/apiPaths';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';

interface UseUploadImageMutationRes {
  imageId: string;
}

interface UseUploadImageMutationProps {
  image: string;
}

const useUploadImageMutation: () => UseMutationResult<
  UseUploadImageMutationRes,
  unknown,
  UseUploadImageMutationProps
> = () => {
  return useMutation(
    async ({ image }): Promise<UseUploadImageMutationRes> => {
      const bodyFormData: FormData = new FormData();
      bodyFormData.append('file', image);

      const res = await Api.post<Res<UseUploadImageMutationRes>, FormData>({
        url: ApiPaths.uploadImage,
        body: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return res.data.data;
    },
    { mutationKey: 'UseUploadImageMutation' },
  );
};

export default useUploadImageMutation;
