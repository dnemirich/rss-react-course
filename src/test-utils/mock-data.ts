import type { Character } from '../types/types.ts';

export const mockCharacterData: Character[] = [
  {
    description: 'Some description',
    name: 'Luke Skywalker',
    uid: '1',
    url: '/people/1',
  },
  { description: '', name: 'Leia Organa', uid: '2', url: '/people/2' },
];

export const mockCharacterDataExtended: Character[] = [
  {
    additionalData: {
      birth_year: '41.9BBY',
      eye_color: 'yellow',
      gender: 'male',
      hair_color: 'none',
      height: '202',
      mass: '136',
      skin_color: 'white',
    },
    description: 'A person within the Star Wars universe',
    name: 'Darth Vader',
    uid: '4',
    url: '/people/4',
  },
];
