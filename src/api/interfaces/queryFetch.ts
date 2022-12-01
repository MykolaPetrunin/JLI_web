type QueryFetch<Response = unknown, Request = unknown> = (props: Request) => Promise<Response>;

export default QueryFetch;
