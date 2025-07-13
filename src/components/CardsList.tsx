import type { Character } from '../types/types.ts';
import { Card } from './Card.tsx';

type Props = {
  data: Character[];
};

export const CardsList = ({ data }: Props) => {
  return (
    <ul className="flex items-center flex-wrap gap-2.5">
      {data.map((item, index) => (
        <Card item={item} key={index} />
      ))}
    </ul>
  );
};
