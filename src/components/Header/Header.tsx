import { Button } from '../Button/Button.tsx';
import { Input } from '../Input/Input.tsx';

type Props = {
  onChange: (value: string) => void;
  onSearch: () => void;
  value: string;
};

export const Header = ({ onChange, onSearch, value }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <header className={'bg-stone-100 p-6 shadow-md w-screen'}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={'flex justify-center items-center gap-3.5'}>
          <Input
            onChangeHandler={onChange}
            onKeyDown={handleKeyDown}
            value={value}
          />
          <Button onClick={onSearch} title={'Search'} />
        </div>
      </div>
    </header>
  );
};
