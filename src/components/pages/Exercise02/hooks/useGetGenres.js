import { useEffect, useState } from "react";


export const useGetGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(false);

  const abortController = new AbortController();
  const signal = abortController.signal;


  useEffect(() => {
    const handleGenresFetch = async () => {
      setLoadingGenres(true)

      try {
        const resp = await fetch(`http://localhost:3001/genres`, {
          signal,
        });
        const data = await resp.json();
        setGenres(data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingGenres(false);

      };
    }

    handleGenresFetch();

    return () => {
      abortController.abort();
    }
  }, []);

  return { loadingGenres, genres }
}