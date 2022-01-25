import { useEffect, useState } from "react";

function useFetchData() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [descending, setDescending] = useState(false);
  const [filterGenre, setFilterGenre] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    setDescending(false);
    handleMovieFetch();
  }, [selectedGenre]);

  useEffect(() => {
    getGenres();
  }, []);

  const handleMovieFetch = () => {
    const url = filterGenre
      ? "http://localhost:3001/movies?"
      : "http://localhost:3001/movies?_limit=50";
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        filterGenre
          ? setMovies(
              json
                .filter((movie) => movie.genres.includes(selectedGenre))
                .sort(
                  (firstMovie, secondMovie) =>
                    firstMovie.year - secondMovie.year
                )
            )
          : setMovies(
              json.sort(
                (firstMovie, secondMovie) => firstMovie.year - secondMovie.year
              )
            );
        setLoading(false);
      })
      .catch(() => {
        console.log("Run yarn movie-api for fake api");
      });
  };

  const changeOrder = () => {
    setDescending(!descending);
    setMovies(
      movies.sort(
        descending
          ? (firstMovie, secondMovie) => firstMovie.year - secondMovie.year
          : (firstMovie, secondMovie) => secondMovie.year - firstMovie.year
      )
    );
  };

  const filterByGenre = () => {
    setFilterGenre(true);
  };

  const getGenres = async () => {
    const data = await fetch("http://localhost:3001/genres");
    const genres = await data.json();
    setGenres(["Select a genre", ...genres]);
  };

  return {
    movies,
    setMovies,
    loading,
    setLoading,
    genres,
    setGenres,
    descending,
    setDescending,
    filterByGenre,
    setFilterGenre,
    selectedGenre,
    setSelectedGenre,
    changeOrder,
    getGenres,
  };
}

export default useFetchData;
