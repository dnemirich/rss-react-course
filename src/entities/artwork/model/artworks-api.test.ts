import { api } from 'shared/lib/base-api.ts';

import {
  mockGeneralResponse,
  mockParams,
  mockParamsWithSearch,
  mockSearchResponse,
} from '../../../shared/utils/test-utils/mock-data.ts';
import { fetchAllArtworks, searchArtworks } from './artworks-api.ts';

describe('fetch artworks', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetchAllArtworks: returns correct data', async () => {
    jest.spyOn(api, 'get').mockResolvedValueOnce({ data: mockGeneralResponse });
    const res = await fetchAllArtworks(mockParams);
    expect(res).toEqual(mockGeneralResponse);
    expect(api.get).toHaveBeenCalledWith('', { params: mockParams });
  });

  it('searchArtworks: returns correct data', async () => {
    jest.spyOn(api, 'get').mockResolvedValueOnce({ data: mockSearchResponse });
    const res = await searchArtworks(mockParamsWithSearch);
    expect(res).toEqual(mockSearchResponse);
    expect(api.get).toHaveBeenCalledWith('/search', {
      params: mockParamsWithSearch,
    });
  });

  it('fetchAllArtworks: throws network error', async () => {
    jest.spyOn(api, 'get').mockRejectedValueOnce(new Error('Network error'));
    await expect(fetchAllArtworks(mockParams)).rejects.toThrow('Network error');
  });

  it('searchArtworks: throws network error', async () => {
    jest.spyOn(api, 'get').mockRejectedValueOnce(new Error('Network error'));
    await expect(searchArtworks(mockParamsWithSearch)).rejects.toThrow(
      'Network error'
    );
  });
});
