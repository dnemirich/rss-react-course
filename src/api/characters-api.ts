import type { CharactersApiResponse } from '../types/types.ts';

import { mapCharacters } from '../utils/characters-mappers.ts';
import { api } from './axios.ts';

export const fetchCharacters = async (name: string) => {
  const response = await api.get<CharactersApiResponse>('/people', {
    params: { name },
  });
  const data = response.data;
  return mapCharacters(data);
};
