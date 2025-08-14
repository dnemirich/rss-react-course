// import { fieldsListLong } from 'shared/constants/items-constants.ts';
// import { baseApi } from 'shared/lib/base-api.ts';
// import {
//   mockDetailedArtworkData,
//   mockGeneralResponse,
//   mockParams,
//   mockParamsWithSearch,
//   mockSearchResponse,
// } from 'shared/utils/test-utils/mock-data.ts';
//
// import {
//   useFetchAllArtworksQuery,
//   useFetchArtworkByIdQuery,
//   useSearchArtworksQuery,
// } from './artworks-api.ts';
//
// import {
//   fetchAllArtworks,
//   fetchArtworkById,
//   searchArtworks,
// } from './artworks-api.ts';
//
// const fields = fieldsListLong.join(',');
//
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

// import { fieldsListLong } from 'shared/constants/items-constants.ts';
// import {
//   mockDetailedArtworkData,
//   mockGeneralResponse,
//   mockParams,
//   mockParamsWithSearch,
//   mockSearchResponse,
// } from 'shared/utils/test-utils/mock-data.ts';
// import type {
//   QueryDefinition,
//   QueryActionCreatorResult,
//   StartQueryActionCreator,
// } from '@reduxjs/toolkit/query';
// import type { MockInstance } from 'jest-mock';
//
// import { artworkApi } from './artworks-api.ts';
//
// const fields = fieldsListLong.join(',');
//
// const endpoint = artworkApi.endpoints.fetchAllArtworks;
//
// type ArgsType = Parameters<InitiateType>[0];
//
// type EndpointType = typeof endpoint;
//
// type InitiateType = EndpointType['initiate'];
//
// type ReturnType = ReturnType<InitiateType>;
//
// let spy: MockInstance<ReturnType, [ArgsType]>;
//
// beforeEach(() => {
//   spy = jest.spyOn(endpoint, 'initiate') as MockInstance<ReturnType, [ArgsType]>;
// });
//
// describe('artworkApi endpoints', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });
//
//   it('fetchAllArtworks: returns correct data', async () => {
//     const mockInitiate: jest.MockedFunction<FetchAllInitiate> = jest.fn(
//       () =>
//         Promise.resolve({
//           data: mockGeneralResponse,
//         }) as ReturnType<FetchAllInitiate>
//     );
//     jest
//       .spyOn(artworkApi.endpoints.fetchAllArtworks, 'initiate')
//       .mockImplementation(mockInitiate);
//
//     const res = await mockInitiate(mockParams);
//     expect(res.data).toEqual(mockGeneralResponse);
//     expect(mockInitiate).toHaveBeenCalledWith(mockParams, undefined);
//   });
//
//   it('searchArtworks: returns correct data', async () => {
//     const mockInitiate: jest.MockedFunction<SearchInitiate> = jest.fn(
//       () =>
//         Promise.resolve({
//           data: mockSearchResponse,
//         }) as ReturnType<SearchInitiate>
//     );
//     jest
//       .spyOn(artworkApi.endpoints.searchArtworks, 'initiate')
//       .mockImplementation(mockInitiate);
//
//     const res = await mockInitiate(mockParamsWithSearch);
//     expect(res.data).toEqual(mockSearchResponse);
//     expect(mockInitiate).toHaveBeenCalledWith(mockParamsWithSearch, undefined);
//   });
//
//   it('fetchArtworkById: returns detailed artwork', async () => {
//     const mockInitiate: jest.MockedFunction<FetchByIdInitiate> = jest.fn(
//       () =>
//         Promise.resolve({
//           data: { data: mockDetailedArtworkData },
//         }) as ReturnType<FetchByIdInitiate>
//     );
//     jest
//       .spyOn(artworkApi.endpoints.fetchArtworkById, 'initiate')
//       .mockImplementation(mockInitiate);
//
//     const res = await mockInitiate({
//       id: String(mockDetailedArtworkData.id),
//       fields,
//     });
//     expect(res.data).toEqual({ data: mockDetailedArtworkData });
//     expect(mockInitiate).toHaveBeenCalledWith(
//       { id: String(mockDetailedArtworkData.id), fields },
//       undefined
//     );
//   });
//
//   it('fetchAllArtworks: throws network error', async () => {
//     const mockInitiate: jest.MockedFunction<FetchAllInitiate> = jest.fn(
//       () =>
//         Promise.reject(
//           new Error('Network error')
//         ) as ReturnType<FetchAllInitiate>
//     );
//     jest
//       .spyOn(artworkApi.endpoints.fetchAllArtworks, 'initiate')
//       .mockImplementation(mockInitiate);
//
//     await expect(mockInitiate(mockParams)).rejects.toThrow('Network error');
//   });
//
//   it('searchArtworks: throws network error', async () => {
//     const mockInitiate: jest.MockedFunction<SearchInitiate> = jest.fn(
//       () =>
//         Promise.reject(new Error('Network error')) as ReturnType<SearchInitiate>
//     );
//     jest
//       .spyOn(artworkApi.endpoints.searchArtworks, 'initiate')
//       .mockImplementation(mockInitiate);
//
//     await expect(mockInitiate(mockParamsWithSearch)).rejects.toThrow(
//       'Network error'
//     );
//   });
//
//   it('fetchArtworkById: throws network error', async () => {
//     const mockInitiate: jest.MockedFunction<FetchByIdInitiate> = jest.fn(
//       () =>
//         Promise.reject(
//           new Error('Network error')
//         ) as ReturnType<FetchByIdInitiate>
//     );
//     jest
//       .spyOn(artworkApi.endpoints.fetchArtworkById, 'initiate')
//       .mockImplementation(mockInitiate);
//
//     await expect(
//       mockInitiate({ id: String(mockDetailedArtworkData.id), fields })
//     ).rejects.toThrow('Network error');
//   });
// });
