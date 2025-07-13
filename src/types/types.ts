export type CharacterShort = {
  uid: string;
  name: string;
  url: string;
};

export type AllCharactersResponse = {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: CharacterShort[];
  apiVersion: string;
  social: Record<string, string>;
  support: Record<string, unknown>;
  timestamp: string;
};

export type CharacterFull = {
  uid: string;
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
};

export type SingleCharacterResponse = {
  message: string;
  result: CharacterFull[];
  apiVersion: string;
  social: Record<string, string>;
  support: Record<string, unknown>;
  timestamp: string;
};

export type CharactersApiResponse = AllCharactersResponse | SingleCharacterResponse;


export type Character = {
  uid: string;
  name: string;
  url: string;
  description: string;
  additionalData?: Record<string, string>;
}