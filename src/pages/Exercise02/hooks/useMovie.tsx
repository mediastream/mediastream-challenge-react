import { useEffect, useState } from 'react';
import { getMovies } from '../services/movies';

export const useMovie = (gender: string, order: string) => {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleMovieFetch = async (gender: string, order: string) => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    const resp = await getMovies(gender, order);
    setMovies(resp);
    setLoading(false);
  };

  useEffect(() => {
    handleMovieFetch(gender, order);
  }, []);

  return {
    movies,
    loading,
    fetchCount,
    handleMovieFetch
  };
};
