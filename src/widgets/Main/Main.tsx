import type { Artwork } from 'entities/artwork';

import { CardsList } from '../CardsList';
import { Pagination } from '../Pagination';

type Props = {
  currentPage: number;
  data: Artwork[];
  onPageChange: (page: number) => void;
  onSelectedItem: (id: number) => void;
  selectedId: string;
  totalPages: number;
};

export const Main = ({
  currentPage,
  data,
  onPageChange,
  onSelectedItem,
  selectedId,
  totalPages,
}: Props) => {
  return (
    <main>
      <div className={'flex flex-col gap-10'}>
        <CardsList
          data={data}
          onSelectedItem={onSelectedItem}
          selectedId={selectedId}
        />
        {data.length > 0 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={totalPages}
          />
        )}
      </div>
    </main>
  );
};
