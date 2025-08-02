import { type Artwork, ArtworkCard } from 'entities/artwork';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks.ts';

import { isSelected, toggleSelection } from '../model';

type Props = {
  item: Artwork;
  onClick: (id: number) => void;
  selectedId: string;
};

export const SelectableArtworkCard = ({ item, onClick, selectedId }: Props) => {
  const selected = useAppSelector((state) => isSelected(state, item.id));
  const dispatch = useAppDispatch();

  const handleCheckbox = () => {
    dispatch(toggleSelection({ selectedItem: item }));
  };

  return (
    <div className="relative">
      <div className="absolute top-2 right-10">
        <label className="flex items-center gap-1">
          <input
            aria-label={`Select artwork ${item.title}`}
            checked={selected}
            className={'w-5 h-5 accent-lime-600'}
            onChange={handleCheckbox}
            type="checkbox"
          />
        </label>
      </div>
      <ArtworkCard item={item} onClick={onClick} selectedId={selectedId} />
    </div>
  );
};
