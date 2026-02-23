export interface BookSummary {
  id: string;
  title: string;
  authorLine: string;
  thumbnail: string | null;
}

export interface BookDetails {
  id: string;
  title: string;
  authors: string[];
  publishedYear: string | null;
  thumbnail: string | null;
  description: string | null;
  averageRating: number | null;
  ratingsCount: number | null;
}
