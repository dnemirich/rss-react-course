import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.artic.edu/api/v1/artworks',
  }),
  endpoints: () => ({}),
  reducerPath: 'artworkApi',
  refetchOnReconnect: true,
  tagTypes: ['Artwork'],
});
