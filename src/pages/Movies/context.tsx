import { createContext, useContext, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from 'helpers/api';
import type { Movie, Movies, MoviesQuery } from 'types/movies';

const MoviesContext = createContext<Movies>({
  genre: '',
  order: 'desc',
  movies: [],
  toggleOrder: () => {},
  filterByGenre: () => {},
});

const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ genre, order }, setQuery] = useState<MoviesQuery>({ genre: '', order: 'desc' });
  const { data: movies } = useSWR<Movie[], Error>(`/movies?genres_like=${genre}&_sort=year&_order=${order}`, fetcher);

  const toggleOrder = () => {
    setQuery((prev) => {
      const query = { ...prev };
      query.order = prev.order === 'asc' ? 'desc' : 'asc';
      return query;
    });
  };

  const filterByGenre = (selected: string) => {
    setQuery((prev) => ({ ...prev, genre: selected }));
  };

  return (
    <MoviesContext.Provider value={{ genre, order, movies: movies || [], toggleOrder, filterByGenre }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;

export const useMovies = () => useContext(MoviesContext);
