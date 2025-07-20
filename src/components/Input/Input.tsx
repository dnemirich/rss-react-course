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
        'bg-stone-50 text-stone-900 border-none rounded-md p-2 outline-orange-500 min-w-sm'
      }
      onChange={handleOnChange}
      placeholder={''}
      type="text"
      {...rest}
    />
  );
};
