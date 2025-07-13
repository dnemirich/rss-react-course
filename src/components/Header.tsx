import { Input } from './Input.tsx';
import { Button } from './Button.tsx';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export const Header = ({ value, onSearch, onChange }: Props) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <header className={''}>
      <div className={'flex justify-center items-center gap-3.5'}>
        <Input value={value} onChangeHandler={onChange} onKeyDown={handleKeyDown} />
        <Button onClick={onSearch} title={'Search'}/>
      </div>
    </header>
  );
};