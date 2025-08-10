// import { fieldsListLong } from 'shared/constants/items-constants.ts';
// import { api } from 'shared/lib/base-api.ts';
// import {
//   mockDetailedArtworkData,
//   mockGeneralResponse,
//   mockParams,
//   mockParamsWithSearch,
//   mockSearchResponse,
// } from 'shared/utils/test-utils/mock-data.ts';
//
// import {
//   fetchAllArtworks,
//   fetchArtworkById,
//   searchArtworks,
// } from './artworks-api.ts';
//
// const fields = fieldsListLong.join(',');
// describe('fetch artworks', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });
//
//   it('fetchAllArtworks: returns correct data', async () => {
//     jest.spyOn(api, 'get').mockResolvedValueOnce({ data: mockGeneralResponse });
//     const res = await fetchAllArtworks(mockParams);
//     expect(res).toEqual(mockGeneralResponse);
//     expect(api.get).toHaveBeenCalledWith('', { params: mockParams });
//   });
//
//   it('searchArtworks: returns correct data', async () => {
//     jest.spyOn(api, 'get').mockResolvedValueOnce({ data: mockSearchResponse });
//     const res = await searchArtworks(mockParamsWithSearch);
//     expect(res).toEqual(mockSearchResponse);
//     expect(api.get).toHaveBeenCalledWith('/search', {
//       params: mockParamsWithSearch,
//     });
//   });
//
//   it('returns detailed artwork when API responds successfully', async () => {
//     jest
//       .spyOn(api, 'get')
//       .mockResolvedValueOnce({ data: { data: mockDetailedArtworkData } });
//
//     const res = await fetchArtworkById(String(16568), fields);
//     expect(res).toEqual({ data: mockDetailedArtworkData });
//     expect(api.get).toHaveBeenCalledWith(`/${mockDetailedArtworkData.id}`, {
//       params: { fields },
//     });
//   });
//
//   it('fetchAllArtworks: throws network error', async () => {
//     jest.spyOn(api, 'get').mockRejectedValueOnce(new Error('Network error'));
//     await expect(fetchAllArtworks(mockParams)).rejects.toThrow('Network error');
//   });
//
//   it('searchArtworks: throws network error', async () => {
//     jest.spyOn(api, 'get').mockRejectedValueOnce(new Error('Network error'));
//     await expect(searchArtworks(mockParamsWithSearch)).rejects.toThrow(
//       'Network error'
//     );
//   });
//
//   it('fetchArtworkById: throws network error', async () => {
//     jest.spyOn(api, 'get').mockRejectedValueOnce(new Error('Network error'));
//     await expect(
//       fetchArtworkById(String(mockDetailedArtworkData.id), fields)
//     ).rejects.toThrow('Network error');
//   });
// });
