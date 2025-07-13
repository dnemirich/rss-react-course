import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export const Button = ({ title, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={
        'bg-orange-500 text-white rounded-md p-2 font-bold hover:bg-orange-400'
      }
    >
      {title}
    </button>
  );
};
