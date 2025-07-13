import { Input } from './Input.tsx';
import { Button } from './Button.tsx';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export const Header = ({ value, onSearch, onChange }: Props) => {
  return (
    <header className={''}>
      <div className={'flex justify-center items-center gap-3.5'}>
        <Input value={value} onChange={onChange} />
        <Button onClick={onSearch} />
      </div>
    </header>
  );
};