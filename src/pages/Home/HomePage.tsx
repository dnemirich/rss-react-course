import { clearSelection, getSelectedItems } from 'features/select-item';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useArtworksSearch } from 'shared/hooks/useArtworksSearch.ts';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks.ts';
import { Loader } from 'shared/ui/Loader';
import { Header } from 'widgets/Header';
import { Main } from 'widgets/Main';
import { SelectionFlyout } from 'widgets/SelectionFlyout';

export const HomePage = () => {
  const { detailsId, page = '1' } = useParams<{
    detailsId?: string;
    page?: string;
  }>();

  const navigate = useNavigate();

  const selectedItems = useAppSelector((state) => getSelectedItems(state));

  const selectedItemsLength = selectedItems.length;
  const dispatch = useAppDispatch();

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

  const handlePageChange = (page: number) => {
    navigate(`/${page}`);
  };

  const handleSearchSubmit = () => {
    navigate('/1');
    handleSearch();
  };

  const handleClear = () => {
    dispatch(clearSelection());
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
          <div className="flex-1 relative pb-20">
            <Main
              currentPage={currentPage}
              data={results}
              onPageChange={handlePageChange}
              onSelectedItem={handleDetails}
              selectedId={detailsId || ''}
              totalPages={totalPages}
            />
          </div>
          {detailsId && (
            <div className="z-50" style={{ width: 400 }}>
              <Outlet />
            </div>
          )}
        </div>
      )}
      {selectedItemsLength > 0 && (
        <SelectionFlyout onClear={handleClear} selectedItems={selectedItems} />
      )}
    </>
  );
};
