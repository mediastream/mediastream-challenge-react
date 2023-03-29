import { useEffect, useState } from "react";
import { getMovies } from "../services/movies";

export const useMovie = (gender, order) => {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleMovieFetch = async (gender, order) => {
    setLoading(true);
    setFetchCount(fetchCount + 1);
    console.log("Getting movies");
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
    handleMovieFetch,
  };
};
