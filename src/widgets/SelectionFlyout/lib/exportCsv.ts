import { type Artwork, artworkApi } from 'entities/artwork';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';
import { fieldsListLong } from 'shared/constants/items-constants.ts';
import { store } from 'shared/lib/store/store.ts';

export async function fetchArtworkByIdViaRtk(id: string, fields: string) {
  try {
    const result = await store.dispatch(
      artworkApi.endpoints.fetchArtworkById.initiate({ fields, id })
    );
    if ('data' in result && result.data) {
      return result.data.data;
    }
    return null;
  } catch {
    return null;
  }
}

const fetchMoreInfo = async (items: Artwork[]) => {
  const params = fieldsListLong.join(',');
  const promises = items.map((item) =>
    fetchArtworkByIdViaRtk(String(item.id), params)
  );
  return await Promise.all(promises);
};

export const exportCsv = async (items: Artwork[]) => {
  const moreInfo = await fetchMoreInfo(items);

  const csv = unparse(moreInfo, {
    delimiter: ',',
    header: true,
    newline: '\r\n',
    quotes: true,
  });

  const bom = '\uFEFF';
  const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });

  const fileName = `${items.length}_items.csv`;

  saveAs(blob, fileName);
};
