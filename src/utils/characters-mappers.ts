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
      additionalData: {
        gender: item.properties.gender,
        height: item.properties.height,
        mass: item.properties.mass,
        hair_color: item.properties.hair_color,
        skin_color: item.properties.skin_color,
        eye_color: item.properties.eye_color,
        birth_year: item.properties.birth_year,
      },
    }));
  } else {
    return [];
  }
};