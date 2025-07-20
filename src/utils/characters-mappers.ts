import type { Character, CharactersApiResponse } from '../types/types.ts';

export const mapCharacters = (
  characters: CharactersApiResponse
): Character[] => {
  if ('results' in characters) {
    const results = characters.results;
    return results.map((item) => ({
      description: '',
      name: item.name,
      uid: item.uid,
      url: item.url,
    }));
  } else {
    const result = characters.result;
    return result.map((item) => ({
      additionalData: {
        birth_year: item.properties.birth_year,
        eye_color: item.properties.eye_color,
        gender: item.properties.gender,
        hair_color: item.properties.hair_color,
        height: item.properties.height,
        mass: item.properties.mass,
        skin_color: item.properties.skin_color,
      },
      description: item.description,
      name: item.properties.name,
      uid: item.uid,
      url: item.properties.url,
    }));
  }
};
