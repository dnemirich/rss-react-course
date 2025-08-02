import type { Artwork } from 'entities/artwork';

import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';

export const exportCsv = (items: Artwork[]) => {
  const csv = unparse(items, {
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
