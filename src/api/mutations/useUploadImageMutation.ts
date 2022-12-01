import ApiPaths from '@api/config/apiPaths';
import QueryRes from '@api/interfaces/queryRes';
import Res from '@api/interfaces/res';
import useQuery from '@api/queries/useQuery';
import Api from '@api/services/api';

interface UseUploadImageMutationRes {
  imageId: string;
}

interface UseUploadImageMutationProps {
  image: string;
}

const useUploadImageMutation: () => QueryRes<
  UseUploadImageMutationRes,
  UseUploadImageMutationProps
> = () => {
  return useQuery<UseUploadImageMutationRes, UseUploadImageMutationProps>(
    async ({ image }): Promise<UseUploadImageMutationRes> => {
      const bodyFormData: FormData = new FormData();
      bodyFormData.append('file', image);

      const res = await Api.post<Res<UseUploadImageMutationRes>, FormData>({
        url: ApiPaths.ImageUpload,
        body: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return res.data.data;
    },
  );
};

export default useUploadImageMutation;
