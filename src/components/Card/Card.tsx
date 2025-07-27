import type { Artwork } from '../../types/types.ts';

import { imgUrl } from '../../constants/items-constants.ts';

type Props = {
  item: Artwork;
  onClick: (id: number) => void;
  selectedId: string;
};

export const Card = ({ item, onClick, selectedId }: Props) => {
  const { artist_title, date_display, id, image_id, title } = item;
  const selected = id === Number(selectedId);
  return (
    <li
      className={`bg-stone-50 rounded min-w-0 w-full flex flex-col max-w-sm shadow-md hover:shadow-lg break-inside-avoid cursor-pointer ${selected ? 'ring-4 ring-stone-400 ' : ''}`}
      onClick={() => onClick(item.id)}
      role={'button'}
      tabIndex={0}
    >
      <div className="w-full p-2 max-h-[320px] min-h-[180px] flex items-center justify-center overflow-hidden rounded">
        {image_id ? (
          <img
            alt={title}
            className="w-full max-h-[300px] h-auto object-contain"
            src={`${imgUrl}/${image_id}/full/400,/0/default.jpg`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full min-h-60 h-full bg-stone-300 text-stone-50 text-sm">
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
