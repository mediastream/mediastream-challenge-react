export type Movie = {
  id: number;
  title: string;
  year: string;
  genres: string[];
  posterUrl: string;
};

export type Movies = MoviesQuery & {
  movies: Movie[];
  toggleOrder: () => void;
  filterByGenre: (item: string) => void;
};

export type MoviesQuery = {
  genre: string;
  order: 'asc' | 'desc';
};
