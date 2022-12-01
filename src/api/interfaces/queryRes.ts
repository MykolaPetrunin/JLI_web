import QueryFetch from '@api/interfaces/queryFetch';

interface QueryRes<Response = unknown, Request = unknown> {
  isLoading: boolean;
  fetch: QueryFetch<Response, Request>;
}

export default QueryRes;
