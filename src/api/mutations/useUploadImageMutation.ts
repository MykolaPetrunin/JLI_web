import { UseMutationResult, useMutation } from '@tanstack/react-query';

import ApiPaths from '@api/config/apiPaths';
import ApiKeys from '@api/enums/apiKeys';
import Res from '@api/interfaces/res';
import Api from '@api/services/api';

interface UseUploadImageMutationRes {
  imageId: string;
}

interface UseUploadImageMutationProps {
  image: string;
}

const UseUploadImageMutation: () => UseMutationResult<
  UseUploadImageMutationRes,
  unknown,
  UseUploadImageMutationProps
> = () => {
  return useMutation({
    mutationKey: [ApiKeys.UploadUserImage],
    mutationFn: async ({ image }): Promise<UseUploadImageMutationRes> => {
      const bodyFormData: FormData = new FormData();
      bodyFormData.append('file', image);

      const res = await Api.post<Res<UseUploadImageMutationRes>, FormData>({
        url: ApiPaths.ImageUpload,
        body: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return res.data.data;
    },
  });
};

export default UseUploadImageMutation;
