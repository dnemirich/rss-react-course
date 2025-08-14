'use client';

import { ArrowPathIcon, PaintBrushIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES } from 'shared/constants/routes';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';

import { ThemeToggler } from '../../providers/theme';

type Props = {
  onChange?: (value: string) => void;
  onRefetch?: () => void;
  onSearch?: () => void;
  value?: string;
};

export const Header = ({ onChange, onRefetch, onSearch, value }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };
  const showForm = onChange && onSearch;

  const navigate = useRouter();

  return (
    <header className={'bg-stone-100 dark:bg-stone-900 p-6 shadow-md w-screen'}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={'flex items-center justify-between'}>
          <PaintBrushIcon
            className={'hover:text-lime-600 cursor-pointer'}
            height={30}
            onClick={() => navigate.push(ROUTES.HOME)}
            width={30}
          />
          <Link href={ROUTES.ABOUT}>
            <span className={'hover:text-lime-600 transition-colors text-lg'}>
              ABOUT
            </span>
          </Link>
          <div className={'flex gap-5 items-center'}>
            {showForm && (
              <form
                className={'flex justify-center items-center gap-3.5'}
                onSubmit={handleSubmit}
                role={'form'}
              >
                <Input onChangeHandler={onChange} value={value} />
                <Button title={'Search'} type={'submit'} />
              </form>
            )}
            {showForm && (
              <ArrowPathIcon
                aria-label="refresh"
                className={`cursor-pointer hover:text-lime-600 transition-colors text-stone-700 dark:text-stone-300 } '}`}
                height={34}
                onClick={onRefetch}
                width={34}
              />
            )}
            <ThemeToggler />
          </div>
        </div>
      </div>
    </header>
  );
};
