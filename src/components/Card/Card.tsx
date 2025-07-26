import type { Artwork } from '../../types/types.ts';

import { imgUrl } from '../../constants/items-constants.ts';

type Props = {
  item: Artwork;
};
export const Card = ({ item }: Props) => {
  const { artist_title, date_display, image_id, title } = item;

  return (
    <li className="bg-stone-100 rounded min-w-0 w-full min-h-60 flex flex-col gap-1 max-w-md shadow-md hover:shadow-lg">
      <div className="w-full aspect-auto overflow-hidden rounded flex items-start">
        {image_id ? (
          <img
            alt={title}
            className="w-full h-auto object-contain"
            src={`${imgUrl}/${image_id}/full/843,/0/default.jpg`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full min-h-80 bg-stone-300 text-stone-50 text-sm">
            Image is not available
          </div>
        )}
      </div>
      <div className={'p-3.5 text-lg flex flex-col gap-1'}>
        <p className={'font-bold text-xl'}>{title}</p>
        <p className={'italic'}>{artist_title}</p>
        <p className={'text-sm text-stone-500'}>{date_display}</p>
      </div>
    </li>
  );
};
