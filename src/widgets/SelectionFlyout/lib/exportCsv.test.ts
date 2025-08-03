import { type Artwork, fetchArtworkById } from 'entities/artwork';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';
import { mockSearchData } from 'shared/utils/test-utils/mock-data.ts';

import { exportCsv } from './exportCsv.ts';

jest.mock('entities/artwork', () => ({
  fetchArtworkById: jest.fn(),
}));

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

jest.mock('papaparse', () => ({
  unparse: jest.fn(),
}));

type MinimalArtwork = Pick<
  Artwork,
  'artist_title' | 'date_display' | 'id' | 'image_id' | 'title'
>;

const minimalItems: MinimalArtwork[] = mockSearchData.map(
  ({ artist_title, date_display, id, image_id, title }) => ({
    artist_title,
    date_display,
    id,
    image_id,
    title,
  })
);

describe('exportCsv', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches detailed info and downloads CSV', async () => {
    (fetchArtworkById as jest.Mock).mockImplementation((id: string) => {
      const found = mockSearchData.find((art) => art.id === Number(id));
      return Promise.resolve({ data: found });
    });

    (unparse as jest.Mock).mockReturnValue('csv-content');

    await exportCsv(minimalItems as unknown as Artwork[]);

    expect(fetchArtworkById).toHaveBeenCalledTimes(minimalItems.length);
    minimalItems.forEach((item) => {
      expect(fetchArtworkById).toHaveBeenCalledWith(
        String(item.id),
        expect.any(String)
      );
    });

    expect(unparse).toHaveBeenCalledWith(mockSearchData, expect.any(Object));

    expect(saveAs).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, fileName] = (saveAs as unknown as jest.Mock).mock.calls[0];
    expect(fileName).toBe(`${minimalItems.length}_items.csv`);
  });

  it('handles fetchArtworkById rejection gracefully', async () => {
    (fetchArtworkById as jest.Mock).mockImplementation((id: string) => {
      if (Number(id) === minimalItems[0].id) {
        return Promise.reject(new Error('Network error'));
      }
      const found = mockSearchData.find((art) => art.id === Number(id));
      return Promise.resolve({ data: found });
    });

    (unparse as jest.Mock).mockReturnValue('csv-content');

    await exportCsv(minimalItems as unknown as Artwork[]);

    expect(fetchArtworkById).toHaveBeenCalledTimes(minimalItems.length);
    const expectedData = [null, ...mockSearchData.slice(1)];

    expect(unparse).toHaveBeenCalledWith(expectedData, expect.any(Object));

    expect(saveAs).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, fileName] = (saveAs as unknown as jest.Mock).mock.calls[0];
    expect(fileName).toBe(`${minimalItems.length}_items.csv`);
  });
});
