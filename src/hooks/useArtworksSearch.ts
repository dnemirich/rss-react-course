import { useCallback, useEffect, useState } from 'react';

import type { Artwork } from '../types/types.ts';

import { fetchAllArtworks, searchArtworks } from '../api/artworks-api';
import { fieldsListLong } from '../constants/items-constants.ts';
import { LS_KEY, PAGE_SIZE } from '../constants/search-constants.ts';

export const useArtworksSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const performSearch = useCallback(async (query: string, page: number) => {
    const params = {
      fields: fieldsListLong.join(','),
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
      setCurrentPage(data.pagination.current_page);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    localStorage.setItem(LS_KEY, searchTerm.trim());
    performSearch(searchTerm.trim(), 1);
  }, [searchTerm, performSearch]);

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY) || '';
    setSearchTerm(stored);
    performSearch(stored, 1);
  }, [performSearch]);

  const goToPage = useCallback(
    (page: number) => {
      performSearch(searchTerm.trim(), page);
    },
    [searchTerm, performSearch]
  );

  return {
    currentPage,
    error,
    goToPage,
    handleSearch,
    isLoading,
    results,
    searchTerm,
    setSearchTerm,
    totalPages,
  };
};
