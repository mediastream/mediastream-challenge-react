import { useCallback, useEffect, useState } from "react";

export default function useExercise02() {
  const [movies, setMovies] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleMovieFetch = useCallback(() => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    console.log('Getting movies')
    fetch('http://localhost:3001/movies?_limit=50')
      .then(res => res.json())
      .then(json => {
        setMovies(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }, []);

  useEffect(() => {
    handleMovieFetch()
  }, [handleMovieFetch]);

  return {
    loading,
    fetchCount,
    movies,
  };
}
