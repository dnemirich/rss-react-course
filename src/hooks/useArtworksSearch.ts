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
  const [totalPages, setTotalPages] = useState<null | number>(null);

  const performSearch = useCallback(
    async (query: string) => {
      const params = {
        fields: fieldsListLong.join(','),
        page: currentPage,
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
    },
    [currentPage]
  );

  const handleSearch = useCallback(() => {
    localStorage.setItem(LS_KEY, searchTerm.trim());
    performSearch(searchTerm.trim());
  }, [searchTerm, performSearch]);

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY) || '';
    setSearchTerm(stored);
    performSearch(stored);
  }, [performSearch]);

  return {
    error,
    handleSearch,
    isLoading,
    results,
    searchTerm,
    setCurrentPage,
    setSearchTerm,
    totalPages,
  };
};
