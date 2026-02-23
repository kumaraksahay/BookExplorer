import { useQuery } from '@tanstack/react-query';
import { getBookDetails } from '../api/googleBooks.api';
import { BookDetails } from '../types/book.types';

export const useBookDetails = (id: string | undefined) => {
  return useQuery<BookDetails, Error>({
    queryKey: ['bookDetails', id],
    queryFn: () => getBookDetails(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};
