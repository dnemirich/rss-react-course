import type { RequestParams, ResponseType } from '../types/types.ts';

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
