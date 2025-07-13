import type { Character } from '../types/types.ts';
import { CardsList } from './CardsList.tsx';
import { Button } from './Button.tsx';
import { Fallback } from './Fallback.tsx';
import { ErrorBoundary } from './ErrorBoundary.tsx';

type Props = {
  data: Character[];
  shouldThrow: boolean;
  onRequestError: () => void;
};

export const Main = ({ data, shouldThrow, onRequestError }: Props) => {
  return (
    <main className={'flex flex-col gap-10'}>
      <ErrorBoundary fallback={<Fallback />}>
        <CardsList data={data} shouldThrow={shouldThrow} />
      </ErrorBoundary>
      <Button
        title={'Throw error'}
        className={'ml-auto'}
        onClick={onRequestError}
      />
    </main>
  );
};
