import { Header } from './components/Header/Header.tsx';
import { Loader } from './components/Loader/Loader.tsx';
import { Main } from './components/Main/Main.tsx';
import { useArtworksSearch } from './hooks/useArtworksSearch.ts';

export const App = () => {
  const { error, handleSearch, isLoading, results, searchTerm, setSearchTerm } =
    useArtworksSearch();

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className={'flex flex-col items-center gap-10'}>
      <Header
        onChange={handleChange}
        onSearch={handleSearch}
        value={searchTerm}
      />
      {isLoading && <Loader />}
      {!isLoading && error && (
        <p
          className={
            'text-red-500 font-bold text-2xl flex items-center min-h-80'
          }
        >
          {error}
        </p>
      )}
      {!isLoading && !error && <Main data={results} />}
    </div>
  );
};
