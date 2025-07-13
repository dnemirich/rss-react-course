import { api } from './axios.ts';
import type { CharactersApiResponse } from '../types/types.ts';
import { mapCharacters } from '../utils/characters-mappers.ts';

export const fetchCharacters = async (name: string) => {
  try {
    const response = await api.get<CharactersApiResponse>('/people', {params: {name}})
    const data = response.data;
    const characters = mapCharacters(data)
    return characters

  } catch (error) {
    console.log(error)
  }
}