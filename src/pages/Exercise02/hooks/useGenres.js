import { useState } from "react";
import { getGenresApi } from "../services/MoviesApi";

export function useGenres() {
  const [genres, setGenres] = useState(null);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [errorGenres, setErrorGenres] = useState(null);
  const [fetchGenresCount, setFetchGenresCount] = useState(0);

  const getGenres = async () => {
    try {
      setFetchGenresCount((fetchGenresCount) => fetchGenresCount + 1);
      setLoadingGenres(true);
      setErrorGenres("");
      const newGenres = await getGenresApi();
      setGenres(newGenres);
    } catch (e) {
      setErrorGenres(e.message);
    } finally {
      setLoadingGenres(false);
    }
  };
  return { genres, getGenres, loadingGenres, errorGenres, fetchGenresCount };
}
