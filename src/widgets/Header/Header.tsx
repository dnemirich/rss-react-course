import { PaintBrushIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';

type Props = {
  onChange?: (value: string) => void;
  onSearch?: () => void;
  value?: string;
};

export const Header = ({ onChange, onSearch, value }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };
  const showForm = onChange && onSearch;

  const navigate = useNavigate();

  return (
    <header className={'bg-stone-100 p-6 shadow-md w-screen'}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={'flex items-center justify-between'}>
          <PaintBrushIcon
            className={'hover:text-lime-600 cursor-pointer'}
            height={30}
            onClick={() => navigate(ROUTES.HOME)}
            width={30}
          />
          <NavLink to={ROUTES.ABOUT}>
            <span className={'hover:text-lime-600 transition-colors text-lg'}>
              ABOUT
            </span>
          </NavLink>
          {showForm && (
            <form
              className={'flex justify-center items-center gap-3.5'}
              onSubmit={handleSubmit}
            >
              <Input onChangeHandler={onChange} value={value} />
              <Button title={'Search'} type={'submit'} />
            </form>
          )}
        </div>
      </div>
    </header>
  );
};
