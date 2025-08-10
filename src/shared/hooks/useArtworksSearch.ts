import {
  useFetchAllArtworksQuery,
  useSearchArtworksQuery,
} from 'entities/artwork';
import { useCallback, useEffect, useState } from 'react';

import { fieldsListShort } from '../constants/items-constants.ts';
import { LS_KEY, PAGE_SIZE } from '../constants/search-constants.ts';

export const useArtworksSearch = ({ page }: { page: number }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastQueried, setLastQueried] = useState<string>('');

  const params = {
    fields: fieldsListShort.join(','),
    page,
    size: PAGE_SIZE,
    ...(lastQueried ? { q: lastQueried } : {}),
  };

  const {
    data: allData,
    error: allError,
    isLoading: allLoading,
  } = useFetchAllArtworksQuery(params, { skip: !!lastQueried });

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useSearchArtworksQuery(
    { ...params, q: lastQueried },
    { skip: !lastQueried }
  );

  const data = lastQueried ? searchData : allData;
  const error = lastQueried ? searchError : allError;
  const isLoading = lastQueried ? searchLoading : allLoading;

  const results = data?.data || [];
  const totalPages = data?.pagination?.total_pages || 1;

  const handleSearch = useCallback(() => {
    const trimmed = searchTerm.trim();
    localStorage.setItem(LS_KEY, trimmed);
    setLastQueried(trimmed);
  }, [searchTerm]);

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY) || '';
    setSearchTerm(stored);
    setLastQueried(stored);
  }, []);

  return {
    currentPage: page,
    error,
    handleSearch,
    isLoading,
    results,
    searchTerm,
    setSearchTerm,
    totalPages,
  };
};
