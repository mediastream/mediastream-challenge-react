import { useState } from "react";
import { getMoviesApi } from "../services/MoviesApi";

export function useMovies() {
  const [movies, setMovies] = useState(null);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [errorMovies, setErrorMovies] = useState(null);
  const [fetchMoviesCount, setFetchMoviesCount] = useState(0);

  const getMovies = async () => {
    try {
      setFetchMoviesCount((fetchMoviesCount) => fetchMoviesCount + 1);
      setLoadingMovies(true);
      setErrorMovies("");
      const newMovies = await getMoviesApi();
      setMovies(newMovies);
    } catch (e) {
      setErrorMovies(e.message);
    } finally {
      setLoadingMovies(false);
    }
  };
  return { movies, getMovies, loadingMovies, errorMovies, fetchMoviesCount };
}
