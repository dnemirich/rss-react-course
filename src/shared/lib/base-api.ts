import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: 'https://api.artic.edu/api/v1/artworks',
    })(args, api, extraOptions);
    return result;
  },
  endpoints: () => ({}),
  reducerPath: 'artworkApi',
  refetchOnReconnect: true,
  tagTypes: ['Artwork'],
});
