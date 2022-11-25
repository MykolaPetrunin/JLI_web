import axios, { AxiosResponse, RawAxiosRequestHeaders } from 'axios';

interface ApiRes<T> {
  data: T;
  status: number;
  authorization?: string;
}

interface PostRequestParams<BodyDataType = unknown> {
  url: string;
  body?: BodyDataType;
  headers?: Partial<RawAxiosRequestHeaders>;
}

type ApiMutation = <Response, RequestParams = unknown>({
  url,
  body,
}: PostRequestParams<RequestParams>) => Promise<ApiRes<Response>>;
type ApiDeleteMutation = <Response>({ url }: PostRequestParams) => Promise<ApiRes<Response>>;

interface ApiType {
  get: <T>(url: string) => Promise<ApiRes<T>>;
  post: ApiMutation;
  remove: ApiDeleteMutation;
  patch: ApiMutation;
  put: ApiMutation;
}

const Api: ApiType = {
  get: async (url) => {
    const { data, status } = await axios.get<ApiRes<Response>, AxiosResponse>(url);

    return {
      data,
      status,
    };
  },
  post: async ({ url, body }) => {
    const {
      data,
      status,
      headers: { authorization },
    } = await axios.post<ApiRes<Response>, AxiosResponse>(url, body);
    return {
      data,
      status,
      authorization,
    };
  },
  remove: async ({ url, headers }) => {
    const { data, status } = await axios.delete<ApiRes<Response>, AxiosResponse>(url, { headers });
    return {
      data,
      status,
    };
  },
  patch: async ({ url, body }) => {
    const { data, status } = await axios.patch<ApiRes<Response>, AxiosResponse>(url, body);
    return {
      data,
      status,
    };
  },
  put: async ({ url, body }) => {
    const { data, status } = await axios.put<ApiRes<Response>, AxiosResponse>(url, body);
    return {
      data,
      status,
    };
  },
};

export default Api;
