import type { Artwork } from '../../types/types.ts';

import { CardsList } from '../CardsList/CardsList.tsx';

type Props = {
  data: Artwork[];
};

export const Main = ({ data }: Props) => {
  return (
    <main className={'flex flex-col gap-10'}>
      <CardsList data={data} />
    </main>
  );
};
