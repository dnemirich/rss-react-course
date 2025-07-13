import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export const Button = ({ title, className, ...rest}: Props) => {
  return (
    <button
      {...rest}
      className={[
        className,
        'bg-orange-500 text-white rounded-md p-2 font-bold hover:bg-orange-400 max-w-40'
      ].filter(Boolean).join(' ')}
    >
      {title}
    </button>
  );
};
