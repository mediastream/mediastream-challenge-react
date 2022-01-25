import { useMemo } from "react";

import { useMovieLibraryContext } from "../../context/MovieLibraryContext";
import { ORDER_LIST } from "../../constants";

import Movie from "../Movie";

import "./styles.css";

const MovieList = () => {
  const {
    movies: { list: moviesList },
    filters: {
      selectedGenre: { value: selectedGenreVal },
      order: { value: orderVal },
    },
  } = useMovieLibraryContext();

  const moviesFiltered = useMemo(() => {
    let filtered = moviesList.sort(ORDER_LIST[orderVal].sort);

    if (selectedGenreVal) {
      filtered = moviesList.filter((movie) =>
        movie.genres.includes(selectedGenreVal)
      );
    }

    return filtered;
  }, [moviesList, orderVal, selectedGenreVal]);

  return (
    <ul className="movie-library__list">
      {moviesFiltered.map(({ id, posterUrl, title, year, runtime, genres }) => (
        <Movie
          key={id}
          posterUrl={posterUrl}
          title={title}
          year={year}
          genres={genres}
        />
      ))}
    </ul>
  );
};

export default MovieList;
