import { clearSelection, getSelectedItems } from 'features/select-item';
import { useSearchParams } from 'react-router-dom';
import { useArtworksSearch } from 'shared/hooks/useArtworksSearch.ts';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks.ts';
import { Loader } from 'shared/ui/Loader';
import { Details } from 'widgets/Details';
import { Header } from 'widgets/Header';
import { Main } from 'widgets/Main';
import { SelectionFlyout } from 'widgets/SelectionFlyout';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page') || '1');
  const detailsId = searchParams.get('details') || '';

  const selectedItems = useAppSelector((state) => getSelectedItems(state));

  const selectedItemsLength = selectedItems.length;
  const dispatch = useAppDispatch();

  const {
    currentPage,
    error,
    handleSearch,
    isFetching,
    isLoading,
    refetch,
    results,
    searchTerm,
    setSearchTerm,
    totalPages,
  } = useArtworksSearch({ page: pageParam });

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleDetails = (id: number) => {
    searchParams.set('details', String(id));
    setSearchParams(searchParams);
  };

  const handlePageChange = (newPage: number) => {
    searchParams.set('page', String(newPage));
    setSearchParams(searchParams);
  };

  const handleSearchSubmit = () => {
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    handleSearch();
  };

  const handleClear = () => {
    dispatch(clearSelection());
  };

  return (
    <>
      <Header
        onChange={handleChange}
        onRefetch={refetch}
        onSearch={handleSearchSubmit}
        value={searchTerm}
      />
      {(isFetching || isLoading) && <Loader />}
      {!isFetching && !isLoading && error && (
        <p
          className={
            'text-red-500 font-bold text-2xl flex items-center min-h-80'
          }
        >
          {String(error)}
        </p>
      )}
      {!isFetching && !isLoading && !error && (
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
              <Details />
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
