'use client';

import { clearSelection, getSelectedItems } from 'features/select-item';
import { useRouter, useSearchParams } from 'next/navigation';
import { useArtworksSearch } from 'shared/hooks/useArtworksSearch.ts';
import { useAppDispatch, useAppSelector } from 'shared/lib/store/hooks.ts';
import { Loader } from 'shared/ui/Loader';
import { Details } from 'widgets/Details';
import { Header } from 'widgets/Header';
import { Main } from 'widgets/Main';
import { SelectionFlyout } from 'widgets/SelectionFlyout';

export const HomePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

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
    const params = new URLSearchParams(searchParams.toString());
    params.set('details', String(id));
    router.replace(`?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.replace(`?${params.toString()}`);
  };

  const handleSearchSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    router.replace(`?${params.toString()}`);
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
          {error}
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
