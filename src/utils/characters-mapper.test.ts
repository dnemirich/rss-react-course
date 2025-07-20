import type {
  AllCharactersResponse,
  SingleCharacterResponse,
} from '../types/types.ts';

import { mapCharacters } from './characters-mappers';

describe('mapCharacters', () => {
  it('returns mapped array for API response with "results" property', () => {
    const apiResponse: AllCharactersResponse = {
      apiVersion: '1.0',
      message: 'ok',
      next: null,
      previous: null,
      results: [
        { name: 'Luke', uid: '1', url: '/people/1' },
        { name: 'Leia', uid: '2', url: '/people/2' },
      ],
      social: {
        discord: 'discord.com',
        github: 'github.com',
        reddit: 'reddit.com',
      },
      support: {
        something: 'something',
      },
      timestamp: '2025-07-16T16:14:13.103Z',
      total_pages: 10,
      total_records: 100,
    };
    expect(mapCharacters(apiResponse)).toEqual([
      { description: '', name: 'Luke', uid: '1', url: '/people/1' },
      { description: '', name: 'Leia', uid: '2', url: '/people/2' },
    ]);
  });

  it('returns mapped array for API response with "result" property', () => {
    const apiResponse: SingleCharacterResponse = {
      apiVersion: '1.0',
      message: 'ok',
      result: [
        {
          description: 'some description',
          properties: {
            birth_year: '41.9BBY',
            created: '2025-07-15T18:55:47.781Z',
            edited: '2025-07-15T18:55:47.781Z',
            eye_color: 'yellow',
            gender: 'male',
            hair_color: 'none',
            height: '202',
            homeworld: 'https://www.swapi.tech/api/planets/1',
            mass: '136',
            name: 'Vader',
            skin_color: 'white',
            url: '/people/3',
          },
          uid: '3',
        },
      ],
      social: {
        discord: 'discord.com',
        github: 'github.com',
        reddit: 'reddit.com',
      },
      support: {
        something: 'something',
      },
      timestamp: '2025-07-16T16:14:13.103Z',
    };
    expect(mapCharacters(apiResponse)).toEqual([
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
        description: 'some description',
        name: 'Vader',
        uid: '3',
        url: '/people/3',
      },
    ]);
  });
});
