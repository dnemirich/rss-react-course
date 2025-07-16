import type { Character } from '../../types/types.ts';

import { Button } from '../Button/Button.tsx';
import { CardsList } from '../CardsList/CardsList.tsx';

type Props = {
  data: Character[];
  onRequestError: () => void;
  shouldThrow: boolean;
};

export const Main = ({ data, onRequestError, shouldThrow }: Props) => {
  if (shouldThrow) {
    throw new Error('Test render error in Main component');
  }

  return (
    <main className={'flex flex-col gap-10'}>
      <CardsList data={data} />
      <Button
        className={'ml-auto'}
        onClick={onRequestError}
        title={'Throw error'}
      />
    </main>
  );
};
