import { type Artwork, fetchArtworkById } from 'entities/artwork';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';
import { fieldsListLong } from 'shared/constants/items-constants.ts';

const fetchMoreInfo = async (items: Artwork[]) => {
  const params = fieldsListLong.join(',');
  const promises = items.map((item) =>
    fetchArtworkById(String(item.id), params)
      .then((data) => data.data)
      .catch(() => null)
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
