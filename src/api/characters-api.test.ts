import { api } from './axios';
import { fetchCharacters } from './characters-api';

describe('fetchCharacters', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return correct data', async () => {
    const mockResponse = {
      data: { results: [{ name: 'Luke', uid: '1', url: 'url.com' }] },
    };
    jest.spyOn(api, 'get').mockResolvedValueOnce(mockResponse);

    const result = await fetchCharacters('Luke');
    expect(api.get).toHaveBeenCalledWith('/people', {
      params: { name: 'Luke' },
    });
    expect(result).toEqual([
      { description: '', name: 'Luke', uid: '1', url: 'url.com' },
    ]);
  });

  it('should throw an error', async () => {
    jest.spyOn(api, 'get').mockRejectedValueOnce(new Error('Network error'));
    await expect(fetchCharacters('Vader')).rejects.toThrow('Network error');
  });
});
