import { useQuery } from '@tanstack/react-query';
import { searchBooks } from '../api/googleBooks.api';
import { BookSummary } from '../types/book.types';

export const useSearchBooks = (query: string) => {
  return useQuery<BookSummary[], Error>({
    queryKey: ['searchBooks', query],
    queryFn: () => searchBooks(query),
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
};
