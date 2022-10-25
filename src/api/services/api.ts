import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

interface ApiRes<T> {
  data: T;
  status: number;
  authorization?: string;
}

interface PostRequestParams<BodyDataType = unknown> {
  url: string;
  body?: BodyDataType;
  headers?: AxiosRequestHeaders;
}

type ApiMutation = <Response, RequestParams>({ url, body }: PostRequestParams<RequestParams>) => Promise<ApiRes<Response>>;
type ApiDeleteMutation = <Response>({ url }: PostRequestParams) => Promise<ApiRes<Response>>;

interface ApiType {
  get: <T>(url: string) => Promise<ApiRes<T>>;
  post: ApiMutation;
  remove: ApiDeleteMutation;
  patch: ApiMutation;
}

const Api: ApiType = {
  get: async (url) => {
    const response = await axios.get<ApiRes<Response>, AxiosResponse>(url);

    return {
      data: response.data.data,
      status: response.status,
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
    const response = await axios.patch<ApiRes<Response>, AxiosResponse>(url, body);
    return {
      data: response.data,
      status: response.status,
    };
  },
};

export default Api;
