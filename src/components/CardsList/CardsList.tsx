import type { Artwork } from '../../types/types.ts';

import { Card } from '../Card/Card.tsx';

type Props = {
  data: Artwork[];
  onSelectedItem: (id: number) => void;
  selectedId: string;
};

export const CardsList = ({ data, onSelectedItem, selectedId }: Props) => {
  if (data.length === 0) {
    return (
      <h2 className={'text-2xl font-bold flex items-center min-h-80'}>
        No artworks matching your request were found
      </h2>
    );
  }

  return (
    <ul
      className="
    grid grid-cols-1 md:grid-cols-3 gap-4
    [grid-template-rows:masonry]
  "
      style={{ gridTemplateRows: 'masonry' }}
    >
      {data.map((item, index) => (
        <Card
          item={item}
          key={index}
          onClick={onSelectedItem}
          selectedId={selectedId}
        />
      ))}
    </ul>
  );
};
