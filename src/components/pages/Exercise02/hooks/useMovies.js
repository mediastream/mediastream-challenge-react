import { useState, useEffect, useCallback, useMemo } from "react";

const ORDER_ASC = "asc";
const ORDER_DESC = "desc";

const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [order, setOrder] = useState(ORDER_ASC);
  const [selectedGenre, setSelectedGenre] = useState();
  const [loading, setLoading] = useState(false);

  const handleMovieFetch = useCallback(() => {
    setLoading(true);
    fetch("http://localhost:3001/movies?_limit=50")
      .then((res) => res.json())
      .then((json) => {
        setMovies(json);
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  }, []);

  const handleFetchGenre = useCallback(() => {
    fetch("http://localhost:3001/genres")
      .then((res) => res.json())
      .then((json) => {
        setGenres(json);
        setSelectedGenre(json[0]);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  }, []);

  const handleToggleOrder = useCallback(() => {
    setOrder(order === ORDER_ASC ? ORDER_DESC : ORDER_ASC);
  }, [order]);

  const filterMoviesByGenre = (movies, genre) => {
    if (!genre) return movies;
    return movies.filter((movie) => movie.genres.includes(genre));
  };

  const sortMoviesByOrder = (movies, order) => {
    return movies
      .filter((movie) => movie.year)
      .sort((a, b) => {
        if (order === ORDER_ASC) {
          return a.year - b.year;
        }
        return b.year - a.year;
      });
  };

  const filteredMoviesByGenre = useMemo(
    () => filterMoviesByGenre(movies, selectedGenre),
    [movies, selectedGenre]
  );
  const filteredMoviesByGenreAndYear = useMemo(
    () => sortMoviesByOrder(filteredMoviesByGenre, order),
    [filteredMoviesByGenre, order]
  );

  useEffect(() => {
    handleMovieFetch();
    handleFetchGenre();
  }, [handleMovieFetch, handleFetchGenre]);

  return useMemo(
    () => ({
      loading,
      genres,
      selectedGenre,
      setSelectedGenre,
      handleToggleOrder,
      movies: filteredMoviesByGenreAndYear,
    }),
    [
      filteredMoviesByGenreAndYear,
      genres,
      loading,
      selectedGenre,
      setSelectedGenre,
      handleToggleOrder,
    ]
  );
};

export default useMovies;
