'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';

import { useTheme } from '../model';

export const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className={`cursor-pointer hover:text-lime-600 transition-colors text-stone-700 dark:text-stone-300 } '}`}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <SunIcon height={36} width={36} />
      ) : (
        <MoonIcon height={36} width={36} />
      )}
    </button>
  );
};
