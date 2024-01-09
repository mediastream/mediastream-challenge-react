import { useCallback, useEffect, useState } from "react";
import Exercise02Service from '../../../services/Exercise02Service';

export default function useExercise02() {
  const [fetchCount, setFetchCount] = useState(0);
  const [orderLabel, setOrderLabel] = useState("Year Descending");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [params, setParams] = useState({
    genre: "",
    order: "asc"
  });

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);

      const movies = await Exercise02Service.getMovies(params);

      setMovies(movies);
    } catch {
      setMovies([]);
    } finally {
      setLoading(false);
      setFetchCount((prevState) => prevState + 1);
    }
  }, [params]);

  const loadGenres = useCallback(async () => {
    try {
      setLoadingGenres(true);

      const genres = await Exercise02Service.getGenres();

      setGenres(genres);
    } catch {
      setGenres([]);
    } finally {
      setLoadingGenres(false);
    }
  }, []);

  useEffect(() => {
    loadMovies()
  }, [loadMovies]);

  useEffect(() => {
    loadGenres()
  }, [loadGenres]);

  function handleChangeGenre(genre) {
    setParams((prevState) => (
      {
        ...prevState,
        genre
      }
    ));
  }

  function handleClickYear() {
    setParams((prevState) => {
      const order = prevState.order === "asc" ? "desc" : "asc";
      return {
        ...prevState,
        order
      }
    });

    setOrderLabel((prevState) => (
      prevState === "Year Ascending" ? "Year Descending" : "Year Ascending"
    ));
  }

  return {
    loading,
    fetchCount,
    movies,
    orderLabel,
    genres,
    loadingGenres,
    handleChangeGenre,
    handleClickYear
  };
}