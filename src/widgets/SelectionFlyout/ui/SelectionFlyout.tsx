import type { Artwork } from 'entities/artwork';

import { Button } from 'shared/ui/Button';

import { exportCsv } from '../lib';

type Props = {
  onClear: () => void;
  selectedItems: Artwork[];
};

export const SelectionFlyout = ({ onClear, selectedItems }: Props) => {
  const selectedItemsCount = selectedItems.length;

  const handleDownload = () => {
    exportCsv(selectedItems);
  };

  return (
    <div className="fixed bottom-2 left-2 right-0 rounded-sm bg-stone-200 dark:bg-stone-600 shadow p-4 flex flex-col gap-3.5 items-center w-100 h-30">
      <div className="text-lg">
        {selectedItemsCount} {selectedItemsCount === 1 ? 'item' : 'items'}{' '}
        selected
      </div>
      <div className="flex gap-2">
        <Button onClick={handleDownload} title={'Download'} />
        <Button onClick={onClear} title={'Unselect all'} />
      </div>
    </div>
  );
};
