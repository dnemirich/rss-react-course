'use client';

import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export const Button = ({ className, title, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={[
        className,
        'bg-stone-500 text-white p-2 font-bold hover:bg-stone-400 max-w-40 shadow-md',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {title}
    </button>
  );
};
