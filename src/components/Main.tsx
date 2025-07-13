import type { Character } from '../types/types.ts';

type Props = {
  data: Character[];
};

export const Main = ({ data }: Props) => {
  return (
    <main>
      <ul className={'flex flex-col gap-2'}>
        {data.map((item, index) => (
          <li key={index} className={'bg-indigo-800 rounded p-3.5'}>{item.name} {item.description}</li>
        ))}
      </ul>
    </main>
  );
};
