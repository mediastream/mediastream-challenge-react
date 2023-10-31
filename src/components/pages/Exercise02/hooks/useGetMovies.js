import { useEffect, useState } from "react";

export const useGetMovies = () => {
  const [movies, setMovies] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const abortController = new AbortController();
  const signal = abortController.signal;



  useEffect(() => {
    const handleMoviesFetch = async () => {
      setLoading(true)
      setFetchCount(fetchCount + 1)
      fetch(`http://localhost:3001/movies`, { signal })
        .then(res => res.json())
        .then(json => {
          setMovies(json);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error)
          setLoading(false);
        })
    }

    handleMoviesFetch()

    return () => {
      abortController.abort();
    }
  }, []);

  return { loading, movies, fetchCount }
}