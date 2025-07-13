import type { Character } from '../types/types.ts';
import { Card } from './Card.tsx';

type Props = {
  data: Character[];
  shouldThrow: boolean;
};

export const CardsList = ({ data, shouldThrow }: Props) => {
  if (shouldThrow) {
    throw new Error('Test error from Cards List render!');
  }

  if (data.length === 0) {
    return (
      <h2 className={'text-2xl font-bold flex items-center min-h-80'}>No characters matching your request were found</h2>
    )
  }

  return (
    <ul className="flex items-center justify-center flex-wrap gap-2.5">
      {data.map((item, index) => (
        <Card item={item} key={index} />
      ))}
    </ul>
  );
};
