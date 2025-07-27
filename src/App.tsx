import { Header } from './components/Header/Header.tsx';
import { Loader } from './components/Loader/Loader.tsx';
import { Main } from './components/Main/Main.tsx';
import { Pagination } from './components/Pagination/Pagination.tsx';
import { useArtworksSearch } from './hooks/useArtworksSearch.ts';

export const App = () => {
  const {
    currentPage,
    error,
    handleSearch,
    isLoading,
    results,
    searchTerm,
    setCurrentPage,
    setSearchTerm,
    totalPages,
  } = useArtworksSearch();

  const handleChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={'flex flex-col items-center gap-10 pb-10'}>
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
      {!isLoading && !error && (
        <div className={'flex flex-col gap-10'}>
          <Main data={results} />
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};
