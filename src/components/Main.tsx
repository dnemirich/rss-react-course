import type { Character } from '../types/types.ts';
import { CardsList } from './CardsList.tsx';

type Props = {
  data: Character[];
};

export const Main = ({ data }: Props) => {
  return (
    <main>
      <CardsList data={data}/>
    </main>
  );
};
