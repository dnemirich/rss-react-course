import type { Character } from '../../types/types.ts';

type Props = {
  item: Character;
};
export const Card = ({ item }: Props) => {
  return (
    <li className="bg-purple-800 rounded p-3.5 min-w-0 w-full min-h-30 flex flex-col gap-1 justify-center items-start max-w-md ">
      <p className={'text-lg'}>
        <span className={'font-bold text-xl'}>Name:</span> {item.name}
      </p>
      <p className={'text-lg'}>
        <span className={'font-bold text-xl'}>Description:</span>{' '}
        {item.description.length > 0 ? item.description : 'No description'}
      </p>
      {item.additionalData &&
        Object.entries(item.additionalData).map(([key, value]) => (
          <p className={'text-lg'} key={key}>
            <span className={'font-bold text-xl capitalize'}>
              {key.split('_').join(' ')}:
            </span>{' '}
            {value}
          </p>
        ))}
    </li>
  );
};
