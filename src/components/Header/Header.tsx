import { Button } from '../Button/Button.tsx';
import { Input } from '../Input/Input.tsx';

type Props = {
  onChange: (value: string) => void;
  onSearch: () => void;
  value: string;
};

export const Header = ({ onChange, onSearch, value }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Не даём странице перегружаться
    onSearch();
  };

  return (
    <header className={'bg-stone-100 p-6 shadow-md w-screen'}>
      <div className="max-w-7xl mx-auto px-4">
        <form
          className={'flex justify-center items-center gap-3.5'}
          onSubmit={handleSubmit}
        >
          <Input onChangeHandler={onChange} value={value} />
          <Button title={'Search'} type={'submit'} />
        </form>
      </div>
    </header>
  );
};
