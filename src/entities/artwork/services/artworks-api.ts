import { baseApi } from 'shared/lib/base-api.ts';

import type { Artwork, RequestParams, ResponseType } from '../model';

export const artworkApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllArtworks: builder.query<ResponseType, RequestParams>({
      query: (params) => {
        return {
          params,
          url: '',
        };
      },
    }),

    fetchArtworkById: builder.query<
      { data: Artwork },
      { fields: string; id: string }
    >({
      query: ({ fields, id }) => {
        return {
          params: { fields },
          url: `/${id}`,
        };
      },
    }),

    searchArtworks: builder.query<ResponseType, RequestParams>({
      query: (params) => {
        return {
          params,
          url: '/search',
        };
      },
    }),
  }),
});

export const {
  useFetchAllArtworksQuery,
  useFetchArtworkByIdQuery,
  useSearchArtworksQuery,
} = artworkApi;
