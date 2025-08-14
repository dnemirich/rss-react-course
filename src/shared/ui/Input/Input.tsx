'use client';

import type { ChangeEvent, InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  onChangeHandler: (value: string) => void;
};

export const Input = ({ onChangeHandler, ...rest }: Props) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(e.target.value);
  };

  return (
    <input
      className={
        'bg-stone-50 dark:bg-stone-600 text-stone-900 dark:text-stone-50 border-none p-2 outline-stone-500 max-w-sm w-full shadow-md'
      }
      onChange={handleOnChange}
      placeholder={''}
      type="text"
      {...rest}
    />
  );
};
