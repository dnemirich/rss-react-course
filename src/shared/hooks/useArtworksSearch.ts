import {
  type Artwork,
  fetchAllArtworks,
  searchArtworks,
} from 'entities/artwork';
import { useCallback, useEffect, useState } from 'react';

import { fieldsListShort } from '../constants/items-constants.ts';
import { LS_KEY, PAGE_SIZE } from '../constants/search-constants.ts';

export const useArtworksSearch = ({ page }: { page: number }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [lastQueried, setLastQueried] = useState<string>('');

  const performSearch = useCallback(async (query: string, page: number) => {
    const params = {
      fields: fieldsListShort.join(','),
      page,
      size: PAGE_SIZE,
    };

    setIsLoading(true);
    setError(null);
    try {
      let data;
      if (query) {
        data = await searchArtworks({ ...params, q: query });
      } else {
        data = await fetchAllArtworks(params);
      }
      setResults(data?.data || []);
      setTotalPages(data.pagination.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    const trimmed = searchTerm.trim();
    localStorage.setItem(LS_KEY, trimmed);
    setLastQueried(trimmed);
    performSearch(trimmed, 1);
  }, [searchTerm, performSearch]);

  // при монтировании
  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY) || '';
    setSearchTerm(stored);
    setLastQueried(stored);
    performSearch(stored, page);
  }, [page, performSearch]);

  useEffect(() => {
    if (lastQueried !== '') {
      performSearch(lastQueried, page);
    } else if (page !== 1) {
      performSearch('', page);
    }
  }, [page, performSearch, lastQueried]);

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
