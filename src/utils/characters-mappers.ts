import type { Character, CharactersApiResponse } from '../types/types.ts';

export const mapCharacters = (
  characters: CharactersApiResponse
): Character[] => {
  if ('results' in characters) {
    const results = characters.results;
    return results.map((item) => ({
      uid: item.uid,
      name: item.name,
      url: item.url,
      description: '',
    }));
  } else if ('result' in characters) {
    const result = characters.result;
    return result.map((item) => ({
      uid: item.uid,
      name: item.properties.name,
      url: item.properties.url,
      description: item.description,
    }));
  } else {
    return [];
  }
};