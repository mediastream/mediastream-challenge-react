import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// initialize an empty api service that we'll inject endpoints into later as needed
export const middlewareApi = createApi({
    reducerPath: 'globalApi',
    tagTypes: [],
    baseQuery: fetchBaseQuery(),
    endpoints: (builder) => ({}),
});
