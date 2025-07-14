export type AllCharactersResponse = {
  apiVersion: string;
  message: string;
  next: null | string;
  previous: null | string;
  results: CharacterShort[];
  social: Record<string, string>;
  support: Record<string, unknown>;
  timestamp: string;
  total_pages: number;
  total_records: number;
};

export type Character = {
  additionalData?: Record<string, string>;
  description: string;
  name: string;
  uid: string;
  url: string;
};

export type CharacterFull = {
  description: string;
  properties: {
    birth_year: string;
    created: string;
    edited: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    skin_color: string;
    url: string;
  };
  uid: string;
};

export type CharactersApiResponse =
  | AllCharactersResponse
  | SingleCharacterResponse;

export type CharacterShort = {
  name: string;
  uid: string;
  url: string;
};

export type SingleCharacterResponse = {
  apiVersion: string;
  message: string;
  result: CharacterFull[];
  social: Record<string, string>;
  support: Record<string, unknown>;
  timestamp: string;
};
