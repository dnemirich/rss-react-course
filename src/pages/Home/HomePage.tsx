import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { Header } from '../../components/Header/Header.tsx';
import { Loader } from '../../components/Loader/Loader.tsx';
import { Main } from '../../components/Main/Main.tsx';
import { useArtworksSearch } from '../../hooks/useArtworksSearch.ts';

export const HomePage = () => {
  const { detailsId, page = '1' } = useParams<{
    detailsId?: string;
    page?: string;
  }>();

  const navigate = useNavigate();

  const {
    currentPage,
    error,
    handleSearch,
    isLoading,
    results,
    searchTerm,
    setSearchTerm,
    totalPages,
  } = useArtworksSearch();

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleDetails = (id: number) => {
    navigate(`/${page}/${id}`);
  };

  const handleCloseDetails = () => {
    navigate(`/${page}`);
  };

  const handlePageChange = (page: number) => {
    navigate(`/${page}`);
  };

  const handleSearchSubmit = () => {
    navigate('/1');
    handleSearch();
  };

  return (
    <>
      <Header
        onChange={handleChange}
        onSearch={handleSearchSubmit}
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
        <div className="flex w-full items-start gap-4">
          <div className="flex-1 relative pb-5">
            <Main
              currentPage={currentPage}
              data={results}
              onPageChange={handlePageChange}
              onSelectedItem={handleDetails}
              selectedId={detailsId || ''}
              totalPages={totalPages}
            />
            {detailsId && (
              <div
                aria-label="Close details section"
                className="fixed inset-0 left-0 z-40 cursor-pointer"
                onClick={handleCloseDetails}
                style={{
                  right: 400,
                }}
              />
            )}
          </div>
          {detailsId && (
            <div className="z-50" style={{ width: 400 }}>
              <Outlet />
            </div>
          )}
        </div>
      )}
    </>
  );
};
