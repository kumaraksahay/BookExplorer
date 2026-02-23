import { client, getErrorMessage } from './client';
import { BookSummary, BookDetails } from '../types/book.types';
import { ensureHttps } from '../utils/format';

interface GoogleBooksVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    description?: string;
    averageRating?: number;
    ratingsCount?: number;
  };
}

interface GoogleBooksSearchResponse {
  items?: GoogleBooksVolume[];
  totalItems: number;
}

const mapToBookSummary = (volume: GoogleBooksVolume): BookSummary => {
  const authors = volume.volumeInfo.authors ?? [];
  const authorLine = authors.length ? authors.join(', ') : 'Unknown Author';
  const thumbnail =
    volume.volumeInfo.imageLinks?.thumbnail ??
    volume.volumeInfo.imageLinks?.smallThumbnail ??
    null;

  return {
    id: volume.id,
    title: volume.volumeInfo.title,
    authorLine,
    thumbnail: ensureHttps(thumbnail),
  };
};

const mapToBookDetails = (volume: GoogleBooksVolume): BookDetails => {
  const publishedDate = volume.volumeInfo.publishedDate ?? '';
  const yearMatch = publishedDate.match(/^\d{4}/);
  const publishedYear = yearMatch ? yearMatch[0] : null;

  const thumbnail =
    volume.volumeInfo.imageLinks?.thumbnail ??
    volume.volumeInfo.imageLinks?.smallThumbnail ??
    null;

  return {
    id: volume.id,
    title: volume.volumeInfo.title,
    authors: volume.volumeInfo.authors ?? [],
    publishedYear,
    thumbnail: ensureHttps(thumbnail),
    description: volume.volumeInfo.description ?? null,
    averageRating: volume.volumeInfo.averageRating ?? null,
    ratingsCount: volume.volumeInfo.ratingsCount ?? null,
  };
};

export const searchBooks = async (query: string): Promise<BookSummary[]> => {
  try {
    const response = await client.get<GoogleBooksSearchResponse>('/volumes', {
      params: { q: query },
    });

    const items = response.data.items ?? [];
    return items.map(mapToBookSummary);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getBookDetails = async (id: string): Promise<BookDetails> => {
  try {
    const response = await client.get<GoogleBooksVolume>(`/volumes/${id}`);
    return mapToBookDetails(response.data);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};