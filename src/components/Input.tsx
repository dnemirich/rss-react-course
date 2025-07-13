import type { ChangeEvent } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const Input = ({ value, onChange }: Props) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    onChange(newValue);
  }

  return (
    <input
      type="text"
      placeholder={''}
      className={
        'bg-stone-50 text-stone-900 border-none rounded-md p-2 outline-orange-500'
      }
      value={value}
      onChange={handleOnChange}
    />
  );
};
