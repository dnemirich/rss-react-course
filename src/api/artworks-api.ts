import type { Artwork, RequestParams, ResponseType } from '../types/types.ts';

import { api } from './axios.ts';

export const fetchAllArtworks = async (params: RequestParams) => {
  const response = await api.get<ResponseType>('', { params });
  return response.data;
};

export const searchArtworks = async (params: RequestParams) => {
  const response = await api.get<ResponseType>('/search', {
    params,
  });
  return response.data;
};

export const fetchArtworkById = async (id: string, fields: string) => {
  const response = await api.get<{ data: Artwork }>(`/${id}`, {
    params: { fields },
  });
  return response.data;
};
